import React, { useState } from 'react';
import styled from 'styled-components';

const StyledGitHubIcon = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  cursor: pointer;
  transition: var(--transition);

  .github-icon {
    width: 40px;
    height: 40px;
    background: var(--green);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(100, 255, 218, 0.3);
    transition: var(--transition);

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(100, 255, 218, 0.4);
    }

    svg {
      width: 20px;
      height: 20px;
      fill: var(--navy);
    }
  }

  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;

    .github-icon {
      width: 35px;
      height: 35px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`;

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 25, 47, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(5px);

  .modal-content {
    background: var(--light-navy);
    border-radius: var(--border-radius);
    padding: 30px;
    border: 1px solid var(--green);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;

    h3 {
      color: var(--green);
      margin: 0 0 20px 0;
      text-align: center;
      font-size: var(--fz-xl);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      max-width: 400px;

      img {
        width: 100%;
        height: auto;
        border-radius: var(--border-radius);
        border: 1px solid var(--lightest-navy);
      }
    }

    .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      background: none;
      border: none;
      color: var(--light-slate);
      font-size: 24px;
      cursor: pointer;
      padding: 5px;
      line-height: 1;

      &:hover {
        color: var(--green);
      }
    }
  }

  @media (max-width: 768px) {
    .modal-content {
      padding: 20px;
      margin: 20px;

      .stats-grid {
        max-width: 100%;
      }
    }
  }
`;

const GitHubStatsIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = 'ABOBALOYI';

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = e => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <StyledGitHubIcon onClick={toggleModal}>
        <div className="github-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </div>
      </StyledGitHubIcon>

      {isModalOpen && (
        <StyledModal onClick={closeModal}>
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              ×
            </button>
            <h3>GitHub Statistics</h3>
            <div className="stats-grid">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '20px',
                  background: 'var(--navy)',
                  borderRadius: 'var(--border-radius)',
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: '1px solid var(--lightest-navy)',
                }}>
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: '40px', height: '40px', fill: 'var(--green)', marginBottom: '10px' }}>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <p style={{ color: 'var(--lightest-slate)', margin: '0 0 5px 0', fontWeight: '600' }}>
                  @{username}
                </p>
                <p style={{ color: 'var(--green)', margin: '0', fontSize: 'var(--fz-sm)' }}>
                  View GitHub Profile →
                </p>
              </a>
            </div>
          </div>
        </StyledModal>
      )}
    </>
  );
};

export default GitHubStatsIcon;
