import React from 'react'

const Compare_Object = () => {
    
  type Person = {
    name: string;
    age: number;
    hobby?:string;
    address?:{
      line1:string,
      line2:string,
      line3:string,
    }
    school?:{
      highschool:string,
      kidschool:string
    }[]
  };

  const obj1: Person = {
    name: 'Bobby Hadz',
    age: 30,
    school:[{
      highschool:"abc1",
      kidschool:"abc1",
    },{
      highschool:"abc1",
      kidschool:"abc1",
    }]
  };
  
  const obj2: Person = {
    age: 30,
    name: 'Bobby Wong',
    address:{
      line1:"string1",
      line2:"string2",
      line3:"string3",
    }
  }; 

  const highlightDifferences =(obj1:any, obj2:any)=>{
    const differences = [];
    for(const key in obj1){
      if(obj1.hasOwnProperty(key)){
        if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
          differences.push(key);
      }
      }
    }

    for(const key in obj2){
      if(obj2.hasOwnProperty(key)&& !differences.includes(key)){
        if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
          differences.push(key);
        }
      }
    }

    return differences;
  }

  const differences = highlightDifferences(obj1, obj2);

  console.log("differences : ", differences);

  return (
    <div>
        
      {Object.entries(obj1).map(([key, value]) => (
        /* notMatch === true && bg-primary */
        <div key={key} className={differences.includes(key) ? 'bg-orange' : 'bg-primary'}>          
          {Array.isArray(value) ? (
            value.map((item, index) => (
            <div key={index}>
              <h2>{key}</h2>
              {Object.entries(item).map(([subKey, subValue]) => (
                <div key={subKey}>
                  <h3>{subKey}</h3>
                  <p>{subValue}</p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div>
          <h2>{key}</h2>
          <p>{value.toString()}</p>
          </div>
        )}
      </div>
    ))}
    </div>
  )
}

export default Compare_Object