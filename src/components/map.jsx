export default function MapComponent() {
  const mapEmbed = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14418.961228990825!2d89.11970024937663!3d25.380018628305162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fcc72bb36d2195%3A0x621845b1fdd0f77!2sHeyatpur!5e0!3m2!1sbn!2sbd!4v1766655830679!5m2!1sbn!2sbd`;

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

