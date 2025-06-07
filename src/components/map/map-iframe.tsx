export default function MapIframe({lat, lng}: {lat: string, lng: string}) {
    const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`;
    return (
    <div>
        <iframe
            src={mapSrc}
            width="100%"
            height="400"
            loading="lazy"
            allowFullScreen
        ></iframe>
    </div>
    )
}