// import React from 'react';
// import './FirstContainer.css';

// import {Routes, Route, Link} from 'react-router-dom'
// import PaanCorner from './PaanCorner'
// import PetCare from './PetCare';
// import BabyCare from './BabyCare';
// import Pharmacy from './Pharmacy';


// const FirstContainer = () => {
//   return (
//    <div> 
   
//    <section class="hero">
//         <div class="wide">
//         <Link  to="/PaanCorner">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2022-05/Group-33704.jpg" alt="Paan Corner" height="100%" width="100%"></img></Link>
//         </div>
//         <div class="smalls">
//             <Link to="/Pharmacy"><img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg" alt="Pharmacy" height="100%" width="100%"></img></Link>
//              <Link to="/PetCare"> <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/Pet-Care_WEB.jpg" alt="Pet Care" height="100%" width="100%"></img></Link>
//               <Link to="/BabyCare"><img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-03/babycare-WEB.jpg" alt="Baby Care" height="100%" width="100%"></img></Link>
            
//         </div>
        
//     </section>

//     <section class="categories">
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-2_10.png" alt="Dairy, Breads and Eggs" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-11.png" alt="Masala, Oil and More" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-12.png" alt="Sauces and Spreads" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-5_4.png" alt="Snacks and Munchies" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-19.png" alt="Personal Care" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-12/paan-corner_web.png" alt="Tobacco and Cigrette" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-7_3.png" alt="Sweet and Tooths" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-8_4.png" alt="Bakery and Biscuits" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-17.png" alt="Cleaning Essentials" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-20.png" alt="Pet Care" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-20.png" alt="Organic And Healthy Livbing" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-10.png" alt="Atta. Rice and Dal" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-4_9.png" alt="ColdDrinks and Juices" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-6_5.png" alt="BreakFast and Instant Foods" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-15.png" alt="Baaby Care" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-16.png" alt="Pharma and Wellness" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-18.png" alt="Home and Offices" height="100%" width="100%"></img>
//         </div>
//         <div class="products">
//             <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-14.png" alt="Organic and Healthy Living" height="100%" width="100%"></img>
//         </div>
        
// </section>
    
   
//     </div>
//   );
// };

// export default FirstContainer;




import React from 'react';
import './FirstContainer.css';
import { Link } from 'react-router-dom';
import productslogo from '../assets/productslogo.png';
import Branchsection from './branch-section';

const FirstContainer = () => {
  // Hero section images
  const heroImages = {
    main: {
      src: productslogo,
      alt: "Jagat Store",
      link: "/JagatStore"
    },
    small: [
      {
        id: 1,
        src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg",
        alt: "Pharmacy",
        link: "/Pharmacy"
      },
      {
        id: 2,
        src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/Pet-Care_WEB.jpg",
        alt: "Pet Care",
        link: "/PetCare"
      },
      {
        id: 3,
        src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-03/babycare-WEB.jpg",
        alt: "Baby Care",
        link: "/BabyCare"
      }
    ]
  };

  // Categories images
  const categoryImages = [
    {
      id: 1,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-2_10.png",
      alt: "Dairy, Breads and Eggs",
      link: "/DairyBreadEggs"
    },
    {
      id: 2,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-11.png",
      alt: "Masala, Oil and More",
      link: "/MasalaOil"
    },
    {
      id: 3,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-12.png",
      alt: "Sauces and Spreads",
      link: "/SaucesSpreads"
    },
    {
      id: 4,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-5_4.png",
      alt: "Snacks and Munchies",
      link: "/SnacksMunchies"
    },
    {
      id: 5,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-19.png",
      alt: "Personal Care",
      link: "/PersonalCare"
    },
   
    {
      id: 7,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-7_3.png",
      alt: "Sweet and Tooths",
      link: "/SweetTooth"
    },
    {
      id: 8,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-8_4.png",
      alt: "Bakery and Biscuits",
      link: "/BakeryBiscuits"
    },
    {
      id: 9,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-17.png",
      alt: "Cleaning Essentials",
      link: "/CleaningEssentials"
    },
    {
      id: 10,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-20.png",
      alt: "Pet Care",
      link: "/PetCare"
    },
    {
      id: 11,
       src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-14.png",
      alt: "Organic and Healthy Living",
      link: "/OrganicHealthyLiving"
    },
    {
      id: 12,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-10.png",
      alt: "Atta, Rice and Dal",
      link: "/AttaRiceDal"
    },
    {
      id: 13,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-4_9.png",
      alt: "Cold Drinks and Juices",
      link: "/ColdDrinksJuices"
    },
    {
      id: 14,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-6_5.png",
      alt: "Breakfast and Instant Foods",
      link: "/BreakfastInstantFoods"
    },
    {
      id: 15,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-15.png",
      alt: "Baby Care",
      link: "/BabyCare"
    },
    {
      id: 16,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-16.png",
      alt: "Pharma and Wellness",
      link: "/Pharmacy"
    },
    {
      id: 17,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-18.png",
      alt: "Home and Offices",
      link: "/HomeOffices"
    },
    {
      id: 18,
      src: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-12/paan-corner_web.png",
      alt: "Paan Corner",
      link: "/PaanCorner"
    }
   
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        {/* Main Wide Banner */}
        <div className="wide">
          <Link to={heroImages.main.link}>
            <img 
              src={heroImages.main.src} 
              alt={heroImages.main.alt}
              loading="eager"
            />
          </Link>
        </div>

        {/* Small Banners */}
        <div className="smalls">
          {heroImages.small.map((image) => (
            <Link key={image.id} to={image.link}>
              <img 
                src={image.src} 
                alt={image.alt}
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        {categoryImages.map((product) => (
          <div key={product.id} className="products">
            <Link to={product.link || "#"}>
              <img 
                src={product.src} 
                alt={product.alt}
                loading="lazy"
              />
            </Link>
          </div>
        ))}
      </section>

      {/* Branch Section */}
      <Branchsection />
    </div>
  );
};

export default FirstContainer;