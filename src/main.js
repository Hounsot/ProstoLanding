  import './style.css'
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.A_CloseButton').addEventListener('click', () => {
      document.querySelector('.O_PopUp').classList.remove('U_Active')
    })
    document.querySelector('.A_NavbarButton').addEventListener('click', () => {
      document.querySelector('.O_PopUp').classList.add('U_Active')
    })
    document.querySelectorAll('.M_Service').forEach(service => {
      let serviceHeadHeight = service.querySelector('.A_Service').offsetHeight
      let serviceDescriptionHeight = service.querySelector('.W_ServiceDescription').offsetHeight
      let serviceFullHeight = serviceHeadHeight + serviceDescriptionHeight
      let serviceTriggerZone = service.querySelector('.A_Service')
      serviceTriggerZone.addEventListener('click', () => {
        if(service.classList.contains('U_Active')){
          document.querySelectorAll('.M_Service').forEach(service => {
            service.style.height = serviceHeadHeight + 'px'
            service.classList.remove('U_Active')
          })  
        } else {
          document.querySelectorAll('.M_Service').forEach(service => {
            service.style.height = serviceHeadHeight + 'px'
            service.classList.remove('U_Active')
          })
          service.style.height = serviceFullHeight + 'px'
          service.classList.add('U_Active')
        }
      })
    })
    document.querySelector('.W_BurgerMenu').addEventListener('click', () => {
      document.querySelector('.O_Navbar').classList.toggle('U_Open')
    })
    document.querySelectorAll('.M_About').forEach(about => {
      let aboutHeadHeight = about.querySelector('.A_About').offsetHeight
      let aboutDescriptionHeight = about.querySelector('.W_AboutDescription').offsetHeight
      let aboutFullHeight = aboutHeadHeight + aboutDescriptionHeight
      about.addEventListener('click', () => {
        if(about.classList.contains('U_Active')){
          document.querySelectorAll('.M_About').forEach(about => {
            about.style.height = aboutHeadHeight + 'px'
            about.classList.remove('U_Active')
          })  
        } else {
          document.querySelectorAll('.M_About').forEach(about => {
            about.style.height = aboutHeadHeight + 'px'
            about.classList.remove('U_Active')
          })
          about.style.height = aboutFullHeight + 'px'
          about.classList.add('U_Active')
        }
      })
    })
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
  })