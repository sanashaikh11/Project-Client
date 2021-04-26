import React, { useEffect, useState } from 'react';

function Dinos() {
  const [dinos, setDinos] = useState([]);

  useEffect(() => {

    fetch('dino.json')
      .then((response) => response.json())
      .then((data) => {
        setDinos(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <img class="about_img"
        src="https://cdn.sstatic.net/Img/company/bg-header-mobile.png?v=41b67237cebd"
        alt="new"
      />
      <p class="about_who">Who we are</p>
      <p class="about_des">Helping developers and technologists write the script of the future.Our public platform serves people to
      solve their queries and issues regarding technology.Anser Now is a public platform is used by nearly everyone who codes to learn, share their knowledge, collaborate, and build their careers.

Our asynchronous knowledge management and collaboration offering Answer Now for Teams, is transforming how people work.</p>

      <h2 class="about_core">Our Core Values:</h2>

      {dinos.map((dino) => (
        <Dino d={dino} key={dino.id} />
      ))}
    </div>
  );
}

export default Dinos;
const Dino = (props) => {
  return (


    <table class="box">
      <tr>

        <td class="box1">
          <img class="about_icon" src={props.d.img1} alt="new" />
          <h5>{props.d.name
          }</h5><p>{props.d.des}</p></td>
        <td class="box1">
          <img class="about_icon" src={props.d.img2} alt="new" />
          <h5>{props.d.name2}</h5>
          <p >{props.d.des2}</p></td>
        <td class="box1">
          <img class="about_icon" src={props.d.img3} alt="new" />
          <h5>{props.d.name3}</h5>
          <p >{props.d.des3}</p></td>
      </tr>
      <tr>
        <td class="box1"> <img class="about_icon" src={props.d.img4} alt="new" />
          <h5>{props.d.name4}</h5>
          <p >{props.d.des4}</p></td>
        <td class="box1">
          <img class="about_icon" src={props.d.img5} alt="new" />
          <h5>{props.d.name5}</h5>
          <p >{props.d.des5}</p></td>
        <td class="box1">
          <img class="about_icon" src={props.d.img6} alt="new" />
          <h5>{props.d.name6}</h5>
          <p >{props.d.des6}</p></td>
      </tr>
    </table>




  )
}