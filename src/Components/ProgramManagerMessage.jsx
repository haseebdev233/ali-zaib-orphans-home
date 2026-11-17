import SiteImage from './SiteImage';
import './ProgramManagerMessage.css';

export default function ProgramManagerMessage({ content }) {
  return (
    <section className="program-manager" aria-labelledby="program-manager-heading">
      <div className="program-manager-inner">
        <SiteImage
          source={content.managerPhoto}
          fallback="/assets/ceo/program-manager.jpeg"
          alt={content.managerName}
          className="program-manager-photo"
          width="693"
          height="977"
          loading="lazy"
          decoding="async"
        />
        <div>
          <h2 id="program-manager-heading">{content.managerTitle}</h2>
          {content.managerMessage.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          <div className="program-manager-signature">
            <strong>{content.managerName}</strong>
            <span>{content.managerRole}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
