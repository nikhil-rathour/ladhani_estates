import './WhatsAppButton.css';

const phoneNumber = '917726886835';
const prefilledMessage = encodeURIComponent('Hi, I am interested in your properties. Please share more details.');
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${prefilledMessage}`;

function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M19.11 17.21c-.3-.15-1.75-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.76.95-.94 1.15-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.5 1.71.64.72.23 1.38.2 1.9.12.58-.09 1.75-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" fill="currentColor" />
        <path d="M16.02 3.2c-6.93 0-12.56 5.64-12.56 12.57 0 2.2.57 4.35 1.66 6.25L3.2 28.8l6.95-1.82c1.82.99 3.86 1.51 5.87 1.51h.01c6.93 0 12.56-5.64 12.56-12.57 0-3.36-1.31-6.51-3.69-8.89-2.38-2.38-5.53-3.7-8.88-3.7zm0 22.97h-.01c-1.86 0-3.68-.5-5.27-1.45l-.38-.22-4.12 1.08 1.1-4.01-.25-.41c-1.08-1.72-1.65-3.7-1.65-5.73 0-5.91 4.81-10.72 10.73-10.72 2.86 0 5.55 1.11 7.57 3.14 2.02 2.02 3.14 4.71 3.14 7.57 0 5.91-4.82 10.72-10.73 10.72z" fill="currentColor" />
      </svg>
    </a>
  );
}

export default WhatsAppButton;
