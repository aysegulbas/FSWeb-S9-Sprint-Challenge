import axios from "axios";
import React, { useEffect, useState } from "react";

// önerilen başlangıç stateleri

export default function AppFunctional(props) {
  const initialMessage = "";
  const initialEmail = "";
  const initialSteps = 0;
  const initialIndex = 4; //  "B" nin bulunduğu indexi
  // setlenmesi gerekenler; location [x,y], index(location indexi),step sayısı,mesaj,email
  const [location, setLocation] = useState([2, 2]);
  const [index, setIndex] = useState(initialIndex);
  const [step, setStep] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);

  // fonksiyon haline getirilmesi gerekenler; email için target.value, formu submit yapmak (post-axios sonuna bir sonuç lazım, hata olursa hata mesajı), yukarı,aşağı,sağa, sol harektler (step sayısını burda artırmalıyım, else hata mesajı olmalı), reset ile initial değerlerine gitmeli, location arrayinin 0-8 arası +index karşılığının bulması
  function onChange(e) {
    setEmail(e.target.value);
  }

  function onSubmit(e) {
    //talimatlarda aşağıdaki 4 obje için uç nokta yaratmış demiş zaten
    e.preventDefault();
    const sonuc = {
      x: location[0],
      y: location[1],
      steps: step,
      email: email,
    };
    axios
      .post("http://localhost:9000/api/result", sonuc)
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      })
      .finally(() => {
        setEmail(initialEmail);
      });
  }

  function up() {
    //x sabit kalıyor, sadece y değişir ama yeri 1'den büyük olmalı 1 eksilir,step 1 artmalı, else durumunda hata mesajı çıkmalı ama önce de set mesajı sıfırlamalıyızki orda sabit kalmasın
    setMessage("");
    if (location[1] > 1) {
      setLocation([location[0], location[1] - 1]);
      setStep(step + 1);
    } else {
      setMessage("Yukarıya gidemezsiniz");
    }
  }
  function down() {
    //x sabit kalıyor , sadece y değişir ama yeri 3'den küçük olmalı 1 artar,step 1 artmalı, else durumunda hata mesajı çıkmalı, ama önce de set mesajı sıfırlamalıyızki orda sabit kalmasın
    setMessage("");
    if (location[1] < 3) {
      setLocation([location[0], location[1] + 1]);
      setStep(step + 1);
    } else {
      setMessage("Aşağıya gidemezsiniz");
    }
  }
  function right() {
    //y sabit kalır, sadece x değişir ama yeri 3'den küçük olmalı, else durumunda hata mesajı vermeli
    setMessage("");
    if (location[0] < 3) {
      setLocation([location[0] + 1, location[1]]);
      setStep(step + 1);
    } else {
      setMessage("Sağa gidemezsiniz");
    }
  }
  function left() {
    //y sabit kalır  sadece x değişir ama yeri 1'den büyük olmalı 1 azalır, else durumunda hata mesajı vermeli
    setMessage("");
    if (location[0] > 1) {
      setLocation([location[0] - 1, location[1]]);
      setStep(step + 1);
    } else {
      setMessage("Sola gidemezsiniz");
    }
  }

  function reset() {
    setLocation([2, 2]);
    setEmail(initialEmail);
    setMessage(initialMessage);
    setStep(initialSteps);
  }
  function indexHesapla() {
    // return'de 0'dan 8'e kadar index numarasına göre active ve null hücreleri hesaplandığı için location[x,y]'e göre index numarası set etmeliyiz
    if (location[0] === 1 && location[1] === 1) {
      setIndex(0);
    }
    if (location[0] === 2 && location[1] === 1) {
      setIndex(1);
    }
    if (location[0] === 3 && location[1] === 1) {
      setIndex(2);
    }
    if (location[0] === 1 && location[1] === 2) {
      setIndex(3);
    }
    if (location[0] === 2 && location[1] === 2) {
      setIndex(4);
    }
    if (location[0] === 3 && location[1] === 2) {
      setIndex(5);
    }
    if (location[0] === 1 && location[1] === 3) {
      setIndex(6);
    }
    if (location[0] === 2 && location[1] === 3) {
      setIndex(7);
    }
    if (location[0] === 3 && location[1] === 3) {
      setIndex(8);
    }
  }
  useEffect(indexHesapla, [location]);

  return (
    // location [x,y], index(location indexi),step sayısı,mesaj,email==> bunları yukarda set ettik, aşağıda denk gelenlere {} içinde yazmalıyız, ayrıca yön fonksiyonları yazdık, onları da onClick içinde yazmalıyız
    //ama indexi {} içinde yazınca kabul etmedi neden????
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar ({location.join(",")})</h3>
        <h3 id="steps">{step} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={left}>
          SOL
        </button>
        <button id="up" onClick={up}>
          YUKARI
        </button>
        <button id="right" onClick={right}>
          SAĞ
        </button>
        <button id="down" onClick={down}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          onChange={onChange}
          value={email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
