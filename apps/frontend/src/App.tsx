import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import {
  CatalogApiError,
  getAlbum,
  getArtist,
  getCountry,
  getGenre,
  type Album,
  type Artist,
} from "./catalog-api.js";
import {
  useCatalogResource,
  type ResourceState,
} from "./use-catalog-resource.js";

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function AtlasLink({ to, children }: { to: string; children: ReactNode }) {
  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    navigate(to);
  }

  return (
    <a href={to} onClick={onClick}>
      {children}
    </a>
  );
}

function BackToEngland() {
  return (
    <p className="back-link">
      <AtlasLink to="/countries/england">Back to England</AtlasLink>
    </p>
  );
}

function ResourceMessage({
  state,
  resourceName,
}: {
  state: ResourceState<unknown>;
  resourceName: string;
}) {
  if (state.status === "loading") {
    return <p role="status">Loading {resourceName}…</p>;
  }

  if (state.status === "error") {
    const isNotFound =
      state.error instanceof CatalogApiError && state.error.status === 404;

    return (
      <section className="message" aria-live="polite">
        <h1>
          {isNotFound
            ? `${resourceName} not found`
            : "Unable to load Music Atlas"}
        </h1>
        <p>
          {isNotFound
            ? `This ${resourceName.toLowerCase()} is not part of the current guide.`
            : "We could not load this page. Please check that the catalog service is running and try again."}
        </p>
        <p>
          <AtlasLink to="/">Return to Music Atlas</AtlasLink>
        </p>
      </section>
    );
  }

  return null;
}

function EmptyCollection({ children }: { children: ReactNode }) {
  return <p className="empty-state">{children}</p>;
}

function HomePage() {
  return (
    <section className="intro">
      <p className="eyebrow">Curated music discovery</p>
      <h1>Music Atlas</h1>
      <p>
        Explore music scenes, artists, and albums through meaningful connections
        to England.
      </p>
      <AtlasLink to="/countries/england">Explore England</AtlasLink>
    </section>
  );
}

function CountryPage({ id }: { id: string }) {
  const state = useCatalogResource(id, getCountry);
  if (state.status !== "success") {
    return <ResourceMessage state={state} resourceName="Country" />;
  }

  const { country, genres, scenes } = state.data.data;
  return (
    <article>
      <p className="eyebrow">Country</p>
      <h1>{country.name}</h1>
      <p className="description">{country.description}</p>

      <section aria-labelledby="genres-heading">
        <h2 id="genres-heading">Genres</h2>
        {genres.length === 0 ? (
          <EmptyCollection>No Genres are available yet.</EmptyCollection>
        ) : (
          <ul className="catalog-list">
            {genres.map((genre) => (
              <li key={genre.id}>
                <AtlasLink to={`/genres/${genre.id}`}>{genre.name}</AtlasLink>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="scenes-heading">
        <h2 id="scenes-heading">Scenes</h2>
        {scenes.length === 0 ? (
          <EmptyCollection>No Scenes are available yet.</EmptyCollection>
        ) : (
          <ul className="catalog-list">
            {scenes.map((scene) => (
              <li key={scene.id}>
                <strong>{scene.name}</strong>
                <span>{scene.timePeriod}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}

function GenrePage({ id }: { id: string }) {
  const state = useCatalogResource(id, getGenre);
  if (state.status !== "success") {
    return <ResourceMessage state={state} resourceName="Genre" />;
  }

  const { genre, artists } = state.data.data;
  return (
    <article>
      <BackToEngland />
      <p className="eyebrow">Genre</p>
      <h1>{genre.name}</h1>
      <p className="description">{genre.description}</p>
      <section aria-labelledby="artists-heading">
        <h2 id="artists-heading">Artists</h2>
        {artists.length === 0 ? (
          <EmptyCollection>
            No artists are currently linked to this Genre.
          </EmptyCollection>
        ) : (
          <ArtistList artists={artists} />
        )}
      </section>
    </article>
  );
}

function ArtistList({ artists }: { artists: Artist[] }) {
  return (
    <ul className="catalog-list">
      {artists.map((artist) => (
        <li key={artist.id}>
          <AtlasLink to={`/artists/${artist.id}`}>{artist.name}</AtlasLink>
        </li>
      ))}
    </ul>
  );
}

function ArtistPage({ id }: { id: string }) {
  const state = useCatalogResource(id, getArtist);
  if (state.status !== "success") {
    return <ResourceMessage state={state} resourceName="Artist" />;
  }

  const { artist, albums } = state.data.data;
  return (
    <article>
      <BackToEngland />
      <p className="eyebrow">Artist</p>
      <h1>{artist.name}</h1>
      <p className="description">{artist.description}</p>
      <section aria-labelledby="albums-heading">
        <h2 id="albums-heading">Albums</h2>
        {albums.length === 0 ? (
          <EmptyCollection>
            No curated Albums are currently linked to this Artist.
          </EmptyCollection>
        ) : (
          <AlbumList albums={albums} />
        )}
      </section>
    </article>
  );
}

function AlbumList({ albums }: { albums: Album[] }) {
  return (
    <ul className="catalog-list">
      {albums.map((album) => (
        <li key={album.id}>
          <AtlasLink to={`/albums/${album.id}`}>{album.title}</AtlasLink>
          <span>{album.releaseType.replaceAll("_", " ")}</span>
        </li>
      ))}
    </ul>
  );
}

function AlbumPage({ id }: { id: string }) {
  const state = useCatalogResource(id, getAlbum);
  if (state.status !== "success") {
    return <ResourceMessage state={state} resourceName="Album" />;
  }

  const { album, artists } = state.data.data;
  return (
    <article>
      <BackToEngland />
      <p className="eyebrow">Album</p>
      <h1>{album.title}</h1>
      <p className="release-type">{album.releaseType.replaceAll("_", " ")}</p>
      <p className="description">{album.description}</p>
      <section aria-labelledby="album-artists-heading">
        <h2 id="album-artists-heading">Artists</h2>
        <ul className="catalog-list">
          {artists.map((artist) => (
            <li key={artist.id}>
              <AtlasLink to={`/artists/${artist.id}`}>{artist.name}</AtlasLink>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function NotFoundPage() {
  return (
    <section className="message">
      <h1>Page not found</h1>
      <p>This route is not part of the current Music Atlas guide.</p>
      <AtlasLink to="/">Return to Music Atlas</AtlasLink>
    </section>
  );
}

function PageForPath({ path }: { path: string }) {
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return <HomePage />;
  if (segments.length === 2 && segments[0] === "countries") {
    return <CountryPage id={segments[1]!} />;
  }
  if (segments.length === 2 && segments[0] === "genres") {
    return <GenrePage id={segments[1]!} />;
  }
  if (segments.length === 2 && segments[0] === "artists") {
    return <ArtistPage id={segments[1]!} />;
  }
  if (segments.length === 2 && segments[0] === "albums") {
    return <AlbumPage id={segments[1]!} />;
  }
  return <NotFoundPage />;
}

export function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const updatePath = () => setPath(window.location.pathname);
    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  return (
    <main>
      <header>
        <AtlasLink to="/">Music Atlas</AtlasLink>
      </header>
      <PageForPath path={path} />
    </main>
  );
}
