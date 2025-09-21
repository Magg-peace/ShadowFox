document.addEventListener("DOMContentLoaded", () => {

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Fade-in sections
  const faders = document.querySelectorAll('.fade-in');
  const appearOnScroll = () => {
    faders.forEach(fade => {
      const rect = fade.getBoundingClientRect();
      if(rect.top < window.innerHeight - 100) fade.classList.add('visible');
    });
  };
  window.addEventListener('scroll', appearOnScroll);
  appearOnScroll();

  // Typing effect
  const typedElement = document.getElementById('typed');
  if(typedElement){
    const phrases = ['Developer', 'Designer', 'Innovator', 'Problem Solver'];
    let charIndex = 0, phraseIndex = 0;

    const type = () => {
      const current = phrases[phraseIndex];
      if(charIndex < current.length){
        typedElement.textContent += current.charAt(charIndex);
        charIndex++;
        setTimeout(type, 150);
      } else {
        setTimeout(erase, 1500);
      }
    };

    const erase = () => {
      const current = phrases[phraseIndex];
      if(charIndex > 0){
        typedElement.textContent = current.substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, 100);
      } else {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
      }
    };

    type();
  }

  // Animate skill bars
  const skillFills = document.querySelectorAll('.skill-fill');
  skillFills.forEach(fill => {
    const width = fill.style.width;
    fill.style.width = '0';
    setTimeout(() => fill.style.width = width, 800);
  });

});
