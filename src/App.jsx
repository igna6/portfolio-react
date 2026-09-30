import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import './index.css';

// Particles Background Component
const ParticlesBackground = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab", // Conecta partículas al cursor
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.8,
            color: "#38bdf8"
          }
        },
        push: {
          quantity: 3,
        },
      },
    },
    particles: {
      color: {
        value: ["#38bdf8", "#c084fc", "#818cf8"],
      },
      links: {
        color: "#818cf8",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
        triangles: {
            enable: true,
            opacity: 0.03
        }
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "bounce",
        },
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
        limit: {
          value: 120, // Límite máximo total de partículas
        }
      },
      opacity: {
        value: { min: 0.1, max: 0.6 },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
            enable: true,
            speed: 2,
            sync: false
        }
      },
    },
    detectRetina: true,
  };

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles id="tsparticles" options={particlesOptions} className="particles-layer" />
    </ParticlesProvider>
  );
};

// GlowEffect Component (subtle glow tracking cursor)
const GlowEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth > 768) {
        requestAnimationFrame(() => {
          setPosition({ x: e.clientX, y: e.clientY });
        });
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      id="glow"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

// FadeInSection Component (using framer-motion)
const FadeInSection = ({ children, className = '', id = '' }) => {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

// Main App
function App() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('ignacio6bruzzesi@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
    window.location.href = "mailto:ignacio6bruzzesi@gmail.com";
  };

  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <ParticlesBackground />
      <GlowEffect />

      <header>
        <nav>
          <a href="#home" className="logo" onClick={(e) => smoothScroll(e, '#home')}>IB.</a>
          <ul className="nav-links">
            <li><a href="#about" onClick={(e) => smoothScroll(e, '#about')}>Sobre Mí</a></li>
            <li><a href="#skills" onClick={(e) => smoothScroll(e, '#skills')}>Skills</a></li>
            <li><a href="#experience" onClick={(e) => smoothScroll(e, '#experience')}>Experiencia</a></li>
            <li><a href="#contact" onClick={(e) => smoothScroll(e, '#contact')}>Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <FadeInSection className="section hero" id="home">
          <div className="hero-content">
            <motion.h1 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                Hola, soy <span className="highlight">Ignacio Bruzzesi</span>
            </motion.h1>
            <motion.h2
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                Estudiante Avanzado de Ingeniería en Sistemas & Desarrollador Web Full Stack
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                Construyendo software con bases sólidas y visión analítica.
            </motion.p>
            <motion.div 
                className="hero-actions"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.8 }}
            >
              <a href="#contact" className="btn primary" onClick={(e) => smoothScroll(e, '#contact')}>Contactar</a>
              <a href="#about" className="btn secondary" onClick={(e) => smoothScroll(e, '#about')}>Conocer más</a>
            </motion.div>
          </div>
        </FadeInSection>

        <FadeInSection className="section" id="about">
          <Tilt glareEnable={true} glareMaxOpacity={0.15} glareColor="#ffffff" glarePosition="all" glareBorderRadius="16px" tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.01}>
            <div className="glass-panel">
                <h2 className="section-title">Sobre Mí</h2>
                <p>Estudiante avanzado de Ingeniería en Sistemas en la UTN Rosario con sólida capacidad analítica y formación técnica como Electromecánico. Cuento con experiencia en resolución de problemas complejos y trabajo en equipo.</p>
                <p>Actualmente enfocado en el desarrollo de software, con conocimientos en tecnologías modernas como React y Node.js, además de bases en C++, SQL y análisis de datos.</p>
                <div className="achievements">
                    <i className='bx bx-trophy'></i> <strong>Logro Destacado:</strong> Ganador del premio "Gen Técnico" de Ternium Siderar por innovación tecnológica con un proyecto para personas con discapacidad visual.
                </div>
            </div>
          </Tilt>
        </FadeInSection>

        <FadeInSection className="section" id="skills">
          <h2 className="section-title">Competencias Técnicas</h2>
          <div className="skills-grid">
            <Tilt glareEnable={true} glareMaxOpacity={0.2} glareBorderRadius="16px" tiltMaxAngleX={10} tiltMaxAngleY={10}>
                <div className="skill-card glass-panel" style={{ height: '100%' }}>
                <i className='bx bx-code-alt card-icon'></i>
                <h3>Lenguajes y Lógica</h3>
                <div className="tech-tags">
                    <span className="tech-tag"><i className='bx bxl-c-plus-plus'></i> C++</span>
                    <span className="tech-tag"><i className='bx bxl-javascript'></i> JavaScript</span>
                    <span className="tech-tag"><i className='bx bxl-typescript'></i> TypeScript</span>
                    <span className="tech-tag"><i className='bx bxl-python'></i> Python</span>
                    <span className="tech-tag"><i className='bx bxl-mongodb'></i> MongoDB</span>
                    <span className="tech-tag"><i className='bx bx-data'></i> MySQL</span>
                </div>
                </div>
            </Tilt>
            <Tilt glareEnable={true} glareMaxOpacity={0.2} glareBorderRadius="16px" tiltMaxAngleX={10} tiltMaxAngleY={10}>
                <div className="skill-card glass-panel" style={{ height: '100%' }}>
                <i className='bx bx-window-alt card-icon'></i>
                <h3>Desarrollo Web</h3>
                <div className="tech-tags">
                    <span className="tech-tag"><i className='bx bxl-react'></i> React</span>
                    <span className="tech-tag"><i className='bx bxl-nodejs'></i> Node.js</span>
                    <span className="tech-tag"><i className='bx bxl-html5'></i> HTML5</span>
                    <span className="tech-tag"><i className='bx bxl-css3'></i> CSS3</span>
                </div>
                </div>
            </Tilt>
            <Tilt glareEnable={true} glareMaxOpacity={0.2} glareBorderRadius="16px" tiltMaxAngleX={10} tiltMaxAngleY={10}>
                <div className="skill-card glass-panel" style={{ height: '100%' }}>
                <i className='bx bx-wrench card-icon'></i>
                <h3>Herramientas</h3>
                <div className="tech-tags">
                    <span className="tech-tag"><i className='bx bxl-git'></i> Git</span>
                    <span className="tech-tag"><i className='bx bxl-github'></i> GitHub</span>
                    <span className="tech-tag"><i className='bx bxl-visual-studio'></i> VS Code</span>
                </div>
                </div>
            </Tilt>
            <Tilt glareEnable={true} glareMaxOpacity={0.2} glareBorderRadius="16px" tiltMaxAngleX={10} tiltMaxAngleY={10}>
                <div className="skill-card glass-panel" style={{ height: '100%' }}>
                <i className='bx bx-brain card-icon'></i>
                <h3>Transversales</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Resolución eficiente, aprendizaje autodidacta, trabajo en equipo.</p>
                </div>
            </Tilt>
          </div>
        </FadeInSection>

        <FadeInSection className="section" id="experience">
          <h2 className="section-title">Formación y Experiencia</h2>
          <div className="timeline">
            <Tilt glareEnable={true} glareMaxOpacity={0.1} glareBorderRadius="16px" tiltMaxAngleX={5} tiltMaxAngleY={5} tiltAxis="y">
                <div className="timeline-item glass-panel">
                <div className="date">2019 - Presente</div>
                <h3>Ingeniería en Sistemas de Información</h3>
                <h4>Universidad Tecnológica Nacional (UTN), Rosario</h4>
                <p>Estudiante avanzado (En curso).</p>
                </div>
            </Tilt>
            <Tilt glareEnable={true} glareMaxOpacity={0.1} glareBorderRadius="16px" tiltMaxAngleX={5} tiltMaxAngleY={5} tiltAxis="y">
                <div className="timeline-item glass-panel">
                <div className="date">Junio 2018 - Sept. 2018</div>
                <h3>Pasantías en Taller Eléctrico</h3>
                <h4>Ternium Siderar</h4>
                <p>Mantenimiento preventivo y correctivo de equipos eléctricos industriales, motores sincrónicos y asincrónicos.</p>
                </div>
            </Tilt>
            <Tilt glareEnable={true} glareMaxOpacity={0.1} glareBorderRadius="16px" tiltMaxAngleX={5} tiltMaxAngleY={5} tiltAxis="y">
                <div className="timeline-item glass-panel">
                <div className="date">2012 - 2018</div>
                <h3>Técnico Electromecánico</h3>
                <h4>E.E.S.T. N° 1 "Bonifacio Velázquez"</h4>
                <p>Promedio General: 8.99.</p>
                </div>
            </Tilt>
          </div>
        </FadeInSection>

        <FadeInSection className="section" id="contact">
          <Tilt glareEnable={true} glareMaxOpacity={0.15} glareBorderRadius="16px" tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.01}>
            <div className="glass-panel text-center">
                <h2 className="section-title">Contacto</h2>
                <p>¿Interesado en trabajar juntos o discutir proyectos tecnológicos? ¡Contáctame!</p>
                <div className="contact-links" style={{ justifyContent: 'center' }}>
                    <a href="mailto:ignacio6bruzzesi@gmail.com" className="contact-btn" onClick={handleCopyEmail}>
                    <i className={emailCopied ? 'bx bx-check' : 'bx bx-envelope'}></i> {emailCopied ? '¡Copiado!' : 'Correo'}
                    </a>
                    <a href="https://www.linkedin.com/in/ignaciobruzzesi/" target="_blank" rel="noreferrer" className="contact-btn">
                    <i className='bx bxl-linkedin'></i> LinkedIn
                    </a>
                </div>
            </div>
          </Tilt>
        </FadeInSection>
      </main>

      <footer>
        <p>&copy; 2026 Ignacio Bruzzesi. Construido con pasión y tecnología.</p>
      </footer>
    </>
  );
}

export default App;
