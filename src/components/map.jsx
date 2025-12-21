export default function MapComponent() {
  const mapEmbed = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5476314032455!2d91.78424432873726!3d22.338268341203108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd9c47acf1acd%3A0x1234567890abcdef!2sLocation!5e0!3m2!1sen!2sbd!4v1234567890`;

  return (
    <div className="w-full py-5 px-2.5">
      <div className="w-full max-w-[1100px] mx-auto">
        <iframe
          src={mapEmbed}
          width="100%"
          height="500"
          style={{ border: 'none' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[500px] md:h-[300px] sm:h-[200px]"
        />
      </div>
    </div>
  );
}