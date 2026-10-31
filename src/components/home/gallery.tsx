import Image from "next/image";

const photos = [
  { src: "/gallery/gallery-1.jpg", caption: "Winter clothes distribution" },
  { src: "/gallery/gallery-2.jpg", caption: "Blanket drive for families" },
  { src: "/gallery/gallery-3.jpg", caption: "Community tree plantation" },
  { src: "/gallery/gallery-4.jpg", caption: "Neighbourhood cleanup" },
  { src: "/gallery/gallery-5.jpg", caption: "Food pack distribution" },
  { src: "/gallery/gallery-6.jpg", caption: "Volunteers at work" },
  { src: "/gallery/gallery-7.jpg", caption: "Helping hands together" },
  { src: "/gallery/gallery-8.jpg", caption: "Smiles that make it worth it" },
];

export function Gallery() {
  return (
    <section
      id="gallery"
      className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:pb-28"
    >
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Moments of service
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          A look at what happens when neighbours show up for each other.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {photos.map((photo) => (
          <figure
            key={photo.src}
            className="group relative aspect-[4/3] overflow-hidden rounded-[20px] border border-border bg-muted"
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs font-medium text-white sm:p-4 sm:text-sm lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}