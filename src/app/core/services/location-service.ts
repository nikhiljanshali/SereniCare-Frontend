import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of, throwError, } from 'rxjs';
import { catchError, map, shareReplay, takeUntil, tap, } from 'rxjs/operators';
import { CascadeSelection, ICity, ICountry, IState, LocationData } from '../interface/basic.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  /** Path to the JSON asset — adjust to match your assets folder. */
  private readonly DATA_URL = '/data/location.json';

  // ── Internal state ────────────────────────────────────────────────────────

  /** Cached, shared HTTP request — fires only once. */
  private locationData$!: Observable<LocationData>;

  /** Current cascade selections exposed as streams. */
  private selectionSubject = new BehaviorSubject<CascadeSelection>({
    country: null,
    state: null,
    city: null,
  });

  /** Derived list streams that components bind to. */
  private countriesSubject = new BehaviorSubject<ICountry[]>([]);
  private statesSubject = new BehaviorSubject<IState[]>([]);
  private citiesSubject = new BehaviorSubject<ICity[]>([]);

  /** Loading / error state. */
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  private destroy$ = new Subject<void>();

  // ── Public observables ────────────────────────────────────────────────────

  /** Emits the full list of countries after the data loads. */
  readonly countries$: Observable<ICountry[]> =
    this.countriesSubject.asObservable();

  /** Emits states for the currently selected country. */
  readonly states$: Observable<IState[]> =
    this.statesSubject.asObservable();

  /** Emits cities for the currently selected state. */
  readonly cities$: Observable<ICity[]> =
    this.citiesSubject.asObservable();

  /** Snapshot of the current ICountry / IState / ICity selection. */
  readonly selection$: Observable<CascadeSelection> =
    this.selectionSubject.asObservable();

  /** True while the JSON file is being fetched. */
  readonly loading$: Observable<boolean> =
    this.loadingSubject.asObservable();

  /** Non-null when an HTTP or parse error has occurred. */
  readonly error$: Observable<string | null> =
    this.errorSubject.asObservable();

  // ── Constructor ───────────────────────────────────────────────────────────

  constructor(private http: HttpClient) {
    this.initData();
  }

  // ── Initialisation ────────────────────────────────────────────────────────

  /**
   * Fetches the JSON once, caches the result, and populates the
   * countries list.  Subsequent calls share the same response.
   */
  private initData(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    // Create a shared, cached observable for the raw data.
    this.locationData$ = this.http
      .get<LocationData>(this.DATA_URL)
      .pipe(
        tap((data) => {
          this.countriesSubject.next(data?.countries ?? []);
          this.loadingSubject.next(false);
        }),
        catchError((err) => {
          const msg =
            err?.message ?? 'Failed to load location data.';
          this.errorSubject.next(msg);
          this.loadingSubject.next(false);
          return throwError(() => new Error(msg));
        }),
        shareReplay(1),
        takeUntil(this.destroy$)
      );

    // Subscribe eagerly so the file is fetched immediately.
    this.locationData$.subscribe();
  }

  // ── Selection API ─────────────────────────────────────────────────────────

  /**
   * Select a country by id.
   * Resets downstream state / city selections.
   */
  selectICountry(countryId: number | null): void {
    if (countryId === null) {
      this.resetAll();
      return;
    }

    this.locationData$
      .pipe(
        map((data) =>
          data.countries.find((c) => c.id === countryId) ?? null
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((country) => {
        this.statesSubject.next(country?.states ?? []);
        this.citiesSubject.next([]);
        this.selectionSubject.next({ country, state: null, city: null });
      });
  }

  /**
   * Select a state by id within the currently selected country.
   * Resets the downstream city selection.
   */
  selectIState(stateId: number | null): void {
    const current = this.selectionSubject.getValue();

    if (stateId === null || !current.country) {
      this.citiesSubject.next([]);
      this.selectionSubject.next({ ...current, state: null, city: null });
      return;
    }

    const state =
      current.country.states.find((s) => s.id === stateId) ?? null;

    this.citiesSubject.next(state?.cities ?? []);
    this.selectionSubject.next({ ...current, state, city: null });
  }

  /**
   * Select a city by id within the currently selected state.
   */
  selectICity(cityId: number | null): void {
    const current = this.selectionSubject.getValue();

    if (cityId === null || !current.state) {
      this.selectionSubject.next({ ...current, city: null });
      return;
    }

    const city =
      current.state.cities.find((c) => c.id === cityId) ?? null;

    this.selectionSubject.next({ ...current, city });
  }

  // ── Direct-value helpers (for non-reactive use) ───────────────────────────

  /** Returns the current selection snapshot synchronously. */
  getSelection(): CascadeSelection {
    return this.selectionSubject.getValue();
  }

  /** Resets all three levels of selection and clears derived lists. */
  resetAll(): void {
    this.statesSubject.next([]);
    this.citiesSubject.next([]);
    this.selectionSubject.next({ country: null, state: null, city: null });
  }

  // ── Query helpers ─────────────────────────────────────────────────────────

  /** Returns an Observable that emits all countries. */
  getAllCountries(): Observable<ICountry[]> {
    return this.locationData$.pipe(
      map((data) => data?.countries ?? [])
    );
  }

  /** Returns an Observable that emits states for the given country id. */
  getIStatesByICountry(countryId: number): Observable<IState[]> {
    return this.locationData$.pipe(
      map(
        (data) =>
          data.countries.find((c) => c.id === countryId)?.states ?? []
      )
    );
  }

  /** Returns an Observable that emits cities for the given state id. */
  getCitiesByIState(
    countryId: number,
    stateId: number
  ): Observable<ICity[]> {
    return this.locationData$.pipe(
      map((data) => {
        const country = data.countries.find((c) => c.id === countryId);
        return (
          country?.states.find((s) => s.id === stateId)?.cities ?? []
        );
      })
    );
  }

  /**
   * Search across all countries, states, and cities.
   * Returns a flat array of match objects for autocomplete / search UIs.
   */
  search(
    query: string
  ): Observable<
    Array<{ type: 'country' | 'state' | 'city'; label: string; ids: number[] }>
  > {
    if (!query?.trim()) return of([]);

    const q = query.toLowerCase();

    return this.locationData$.pipe(
      map((data) => {
        const results: Array<{
          type: 'country' | 'state' | 'city';
          label: string;
          ids: number[];
        }> = [];

        for (const country of data.countries) {
          if (country.name.toLowerCase().includes(q)) {
            results.push({
              type: 'country',
              label: country.name,
              ids: [country.id],
            });
          }
          for (const state of country.states) {
            if (state.name.toLowerCase().includes(q)) {
              results.push({
                type: 'state',
                label: `${state.name}, ${country.name}`,
                ids: [country.id, state.id],
              });
            }
            for (const city of state.cities) {
              if (city.name.toLowerCase().includes(q)) {
                results.push({
                  type: 'city',
                  label: `${city.name}, ${state.name}, ${country.name}`,
                  ids: [country.id, state.id, city.id],
                });
              }
            }
          }
        }
        return results;
      })
    );
  }
  /**
 * Generic method to resolve names from IDs
 */
  getLocationName(
    countryId?: number,
    stateId?: number,
    cityId?: number
  ): Observable<{ country?: string; state?: string; city?: string }> {
    return this.locationData$.pipe(
      map((data) => {
        let countryName: string | undefined;
        let stateName: string | undefined;
        let cityName: string | undefined;

        const country = data.countries.find(c => c.id === countryId);
        if (country) {
          countryName = country.name;

          const state = country.states.find(s => s.id === stateId);
          if (state) {
            stateName = state.name;

            const city = state.cities.find(c => c.id === cityId);
            if (city) {
              cityName = city.name;
            }
          }
        }

        return {
          country: countryName,
          state: stateName,
          city: cityName
        };
      })
    );
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
