import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Toast from "../../molecule/toast/Toast";

function CovidInfo(){

  const facts = [
    {
      id: 1,
      title: "Transmission",
      detail: "The virus spreads mainly through respiratory droplets when an infected person coughs, sneezes, or talks."
    },
    {
      id: 2,
      title: "Common Symptoms",
      detail: "Key indicators include fever, dry cough, fatigue, and loss of taste or smell, appearing 2-14 days after exposure."
    },
    {
      id: 3,
      title: "Vaccination Impact",
      detail: "Vaccines significantly reduce the risk of severe illness, hospitalization, and death, as seen in the 2.2 billion doses administered in India."
    },
    {
      id: 4,
      title: "Prevention Basics",
      detail: "Consistent hand washing, wearing masks in crowded spaces, and maintaining physical distance remain the most effective defenses."
    },
    {
      id: 5,
      title: "Variant Evolution",
      detail: "Viruses constantly change through mutation. New variants (like Omicron or Delta) can be more transmissible than the original strain."
    },
    {
      id: 6,
      title: "Asymptomatic Spread",
      detail: "Individuals can carry and spread the virus without ever showing symptoms, making testing crucial for containment."
    }
  ];

  const comingDueToError = false;
  const location = useLocation();

  useEffect(()=>{
      if(location.state!=null && location.state.loadedDueToError!=null && location.state.loadedDueToError){
        setLoadedDueToError(true);
      }
  }, []);

  function resetError() {
        setLoadedDueToError(false);
    }

  const [loadedDueToError, setLoadedDueToError] = useState(comingDueToError);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
        Essential COVID-19 Facts
      </h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {facts.map((fact) => (
          <li key={fact.id} style={{ 
            marginBottom: '15px', 
            padding: '15px', 
            borderRadius: '8px', 
            backgroundColor: '#f8f9fa',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <strong style={{ color: '#2980b9', display: 'block', marginBottom: '5px' }}>
              {fact.id}. {fact.title}
            </strong>
            <span style={{ color: '#555', lineHeight: '1.5' }}>
              {fact.detail}
            </span>
          </li>
        ))}
      </ul>
      {loadedDueToError ? <Toast
              message={'Connection failed, Let\'s browse facts'}
              type={'error'}
              onClose={resetError}
          /> : <div></div>
        }
    </div>
  );
};

export default CovidInfo;