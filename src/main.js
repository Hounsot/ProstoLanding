import './style.css'

// Service toggle function
function setupServiceToggles() {
  document.querySelectorAll('.M_Service').forEach(service => {
    let serviceTriggerZone = service.querySelector('.A_Service')
    serviceTriggerZone.addEventListener('click', () => {
      // Calculate heights inside the click handler to ensure they're current
      const clickedServiceHeadHeight = service.querySelector('.A_Service').offsetHeight
      const clickedServiceDescriptionHeight = service.querySelector('.W_ServiceDescription').offsetHeight
      const clickedServiceFullHeight = clickedServiceHeadHeight + clickedServiceDescriptionHeight
      
      if(service.classList.contains('U_Active')){
        document.querySelectorAll('.M_Service').forEach(item => {
          const headHeight = item.querySelector('.A_Service').offsetHeight
          item.style.height = headHeight + 'px'
          item.classList.remove('U_Active')
        })  
      } else {
        document.querySelectorAll('.M_Service').forEach(item => {
          const headHeight = item.querySelector('.A_Service').offsetHeight
          item.style.height = headHeight + 'px'
          item.classList.remove('U_Active')
        })
        service.style.height = clickedServiceFullHeight + 'px'
        service.classList.add('U_Active')
      }
    })
  })
}

// About toggle function
function setupAboutToggles() {
  document.querySelectorAll('.M_About').forEach(about => {
    about.addEventListener('click', () => {
      // Calculate heights inside the click handler to ensure they're current
      const clickedAboutHeadHeight = about.querySelector('.A_About').offsetHeight
      const clickedAboutDescriptionHeight = about.querySelector('.W_AboutDescription').offsetHeight
      const clickedAboutFullHeight = clickedAboutHeadHeight + clickedAboutDescriptionHeight
      
      if(about.classList.contains('U_Active')){
        document.querySelectorAll('.M_About').forEach(item => {
          const headHeight = item.querySelector('.A_About').offsetHeight
          item.style.height = headHeight + 'px'
          item.classList.remove('U_Active')
        })  
      } else {
        document.querySelectorAll('.M_About').forEach(item => {
          const headHeight = item.querySelector('.A_About').offsetHeight
          item.style.height = headHeight + 'px'
          item.classList.remove('U_Active')
        })
        about.style.height = clickedAboutFullHeight + 'px'
        about.classList.add('U_Active')
      }
    })
  })
}

// Reset all services and about sections to their default heights
function resetExpandableElements() {
  document.querySelectorAll('.M_Service').forEach(item => {
    const headHeight = item.querySelector('.A_Service').offsetHeight
    item.style.height = headHeight + 'px'
    item.classList.remove('U_Active')
  })
  
  document.querySelectorAll('.M_About').forEach(item => {
    const headHeight = item.querySelector('.A_About').offsetHeight
    item.style.height = headHeight + 'px'
    item.classList.remove('U_Active')
  })
}

// Adjust hero logo middle height if needed to fit screen
function adjustHeroLogoHeight() {
  const heroLogo = document.querySelector('.A_HeroLogo');
  const heroLoaderProcess = document.querySelector('.A_HeroLoaderProcess');
  const heroLogoMiddle = document.querySelector('.A_HeroLogoMiddle');
  
  if (heroLogo && heroLoaderProcess && heroLogoMiddle) {
    const totalHeight = heroLogo.offsetHeight + 96 + heroLoaderProcess.offsetHeight;
    
    if (window.innerHeight < totalHeight) {
      // Calculate how much we need to reduce the height
      const excessHeight = totalHeight - window.innerHeight + 20; // Adding small buffer
      const currentHeight = heroLogoMiddle.getBoundingClientRect().height;
      const newHeight = Math.max(currentHeight - excessHeight, 100); // Don't go below 100px
      
      heroLogoMiddle.style.height = newHeight + 'px';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.A_CloseButton').addEventListener('click', () => {
    document.querySelector('.O_PopUp').classList.remove('U_Active')
  })
  document.querySelector('.A_NavbarButton').addEventListener('click', () => {
    document.querySelector('.O_PopUp').classList.add('U_Active')
  })
  
  // Set up service toggles
  setupServiceToggles()
  
  document.querySelector('.W_BurgerMenu').addEventListener('click', () => {
    document.querySelector('.O_Navbar').classList.toggle('U_Open')
  })
  
  // Set up about toggles
  setupAboutToggles()
  
  // Run height adjustment on load
  adjustHeroLogoHeight();
  
  document.querySelectorAll('.A_ServiceButton').forEach(serviceButton => {
    serviceButton.addEventListener('click', () => {
      document.querySelector('.O_PopUp').classList.add('U_Active')
    })
  })
  let HeroLoaderProcess = document.querySelector('.A_HeroLoaderProcess')
  let heroLoaderProcessPosition = document.querySelector('.A_HeroLogo').offsetHeight + 48 + document.querySelector('.A_Loader').offsetHeight
  HeroLoaderProcess.style.bottom = heroLoaderProcessPosition + 'px'
  let HeroLoaderLine = document.querySelector('.A_Loader')
  let heroLoaderLinePosition = document.querySelector('.A_HeroLogo').offsetHeight + 24
  HeroLoaderLine.style.bottom = heroLoaderLinePosition + 'px'
  function loadingAnimation() {
    let navbar = document.querySelector('.O_Navbar')
    let heroSectionBG = document.querySelector('.A_RedBackground')
    navbar.classList.add('U_Active')
    heroSectionBG.classList.add('U_Active')
    HeroLoaderProcess.style.bottom = heroLoaderProcessPosition + window.innerHeight + 'px'
    HeroLoaderLine.style.bottom = heroLoaderLinePosition + window.innerHeight + 'px'
    document.querySelectorAll('.U_Hide').forEach(element => {
      element.classList.remove('U_Hide')
    })
  }

  let loaderProcess = 0
  let loaderProcessInterval = setInterval(() => {
    loaderProcess++
    document.querySelector('.A_HeroLoaderProcess').textContent = loaderProcess + '%'
    // loading line animation
    document.querySelector('.A_LoaderLine').style.width = loaderProcess + '%'
    if(loaderProcess >= 100){
      clearInterval(loaderProcessInterval)
      document.body.classList.remove('U_Preload')
      setTimeout(() => {
        loadingAnimation()
      }, 500)
    }
  }, 10)

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });

        // Close mobile navbar if the link is inside it
        const navbar = document.querySelector('.O_Navbar');
        if (navbar.classList.contains('U_Open') && this.closest('.W_NavbarMobile')) {
          navbar.classList.remove('U_Open');
        }
      }
    });
  });
})

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  // Debounce the resize event
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Reset expandable elements to default state
    resetExpandableElements();
    
    // Adjust hero logo height
    adjustHeroLogoHeight();
  }, 250);
});