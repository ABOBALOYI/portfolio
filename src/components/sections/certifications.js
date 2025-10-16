import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledCertificationsSection = styled.section`
  max-width: 1000px;

  .inner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 30px;
    margin-top: 50px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      grid-gap: 20px;
    }
  }
`;

const StyledCertCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  background-color: var(--light-navy);
  border-radius: var(--border-radius);
  transition: var(--transition);
  text-decoration: none;
  border: 1px solid var(--lightest-navy);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    border-color: var(--green);
  }

  .cert-image {
    width: 150px;
    height: 150px;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    @media (max-width: 768px) {
      width: 120px;
      height: 120px;
    }
  }

  .cert-title {
    color: var(--lightest-slate);
    font-size: var(--fz-lg);
    font-weight: 600;
    text-align: center;
    margin-bottom: 10px;
    line-height: 1.3;

    @media (max-width: 768px) {
      font-size: var(--fz-md);
    }
  }

  .cert-issuer {
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    text-align: center;
    margin-bottom: 5px;
  }

  .cert-date {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    text-align: center;
  }
`;

const StyledCredlyLink = styled.div`
  margin-top: 50px;
  text-align: center;

  a {
    ${({ theme }) => theme.mixins.inlineLink};
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }
`;

const Certifications = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const certifications = [
    {
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'Issued 2025',
      image:
        'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
      url: 'https://www.credly.com/badges/465c86eb-3d0c-4e83-93ff-77961b695679',
    },
    {
      title: 'CompTIA Security+',
      issuer: 'CompTIA',
      date: 'Issued 2025',
      image:
        'https://images.credly.com/size/340x340/images/80d8a06a-c384-42bf-ad36-db81bce5adce/blob',
      url: 'https://www.credly.com/badges/f654de92-5cb3-4de9-926f-d271741b507e',
    },
    {
      title: 'SC2 Candidate',
      issuer: ' ISC2',
      date: 'Issued 2025',
      image:
        'https://images.credly.com/size/340x340/images/9180921d-4a13-429e-9357-6f9706a554f0/image.png',
      url: 'https://www.credly.com/badges/c2706288-3729-4d9f-be93-2120efb6e827',
    },
  ];

  return (
    <StyledCertificationsSection id="certifications" ref={revealContainer}>
      <h2 className="numbered-heading">Certifications</h2>

      <div className="inner">
        {certifications.map((cert, i) => (
          <StyledCertCard
            key={i}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${cert.title} certification`}>
            <div className="cert-image">
              <img src={cert.image} alt={cert.title} />
            </div>
            <div className="cert-title">{cert.title}</div>
            <div className="cert-issuer">{cert.issuer}</div>
            <div className="cert-date">{cert.date}</div>
          </StyledCertCard>
        ))}
      </div>

      <StyledCredlyLink>
        <a href="https://www.credly.com/users/abo-baloyi" target="_blank" rel="noopener noreferrer">
          View all certifications on Credly →
        </a>
      </StyledCredlyLink>
    </StyledCertificationsSection>
  );
};

export default Certifications;
