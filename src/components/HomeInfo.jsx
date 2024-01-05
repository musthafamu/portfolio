import { Link } from "react-router-dom";

import { socialLinks } from "../constants";
const HomeInfo = ({ currentStage }) => {

    return (
  <div>

      <div className='sm:text-xl  sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Hi, I'm
        <span className='font-semibold mx-2 text-white'>Musthafa</span>
        👋
        <br />
        A Software Engineer from Kerala
        
        <div className="flex gap-2 items-center  justify-center mt-3">
      {socialLinks.map((link) => (

            <Link key={link.name} to={link.link} target='_blank'>
              <img
            
                src={link.iconUrl}
                alt={link.name}
                className='w-6 h-6  shadow-xl object-contain'
              />
            </Link>
          ))}
          </div>
      </div>
  </div>
    );

 


   


  return null;
};

export default HomeInfo;
