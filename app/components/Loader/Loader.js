import React from 'react'
//taken from internet
const Loading = () => {
  return (
   <div className="hand fixed w-20 h-16 ml-200 mt-100 ">
      <div className="finger"></div>
      <div className="finger"></div>
      <div className="finger"></div>
      <div className="finger"></div>
      <div className="palm"></div>
      <div className="thumb"></div>

      <style jsx>{`
        .hand {
          --skin-color: #E4C560;
          --tap-speed: 0.6s;
          --tap-stagger: 0.1s;
        }
        .hand::before {
          content: '';
          display: block;
          width: 180%;
          height: 75%;
          position: absolute;
          top: 70%;
          right: 20%;
          background-color: black;
          border-radius: 40px 10px;
          filter: blur(10px);
          opacity: 0.3;
        }
        .palm {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: var(--skin-color);
          border-radius: 10px 40px;
        }
        .thumb {
          position: absolute;
          width: 120%;
          height: 38px;
          background-color: var(--skin-color);
          bottom: -18%;
          right: 1%;
          transform-origin: calc(100% - 20px) 20px;
          transform: rotate(-20deg);
          border-radius: 30px 20px 20px 10px;
          border-bottom: 2px solid rgba(0, 0, 0, 0.1);
          border-left: 2px solid rgba(0, 0, 0, 0.1);
        }
        .thumb::after {
          width: 20%;
          height: 60%;
          content: '';
          background-color: rgba(255, 255, 255, 0.3);
          position: absolute;
          bottom: -8%;
          left: 5px;
          border-radius: 60% 10% 10% 30%;
          border-right: 2px solid rgba(0, 0, 0, 0.05);
        }
        .finger {
          position: absolute;
          width: 80%;
          height: 35px;
          background-color: var(--skin-color);
          bottom: 32%;
          right: 64%;
          transform-origin: 100% 20px;
          transform: rotate(10deg);
          animation-duration: calc(var(--tap-speed) * 2);
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .finger::before {
          content: '';
          position: absolute;
          width: 140%;
          height: 30px;
          background-color: var(--skin-color);
          bottom: 8%;
          right: 65%;
          transform-origin: calc(100% - 20px) 20px;
          transform: rotate(-60deg);
          border-radius: 20px;
        }
        .finger:nth-child(1) {
          animation-delay: 0;
          filter: brightness(70%);
          animation-name: tap-upper-1;
        }
        .finger:nth-child(2) {
          animation-delay: var(--tap-stagger);
          filter: brightness(80%);
          animation-name: tap-upper-2;
        }
        .finger:nth-child(3) {
          animation-delay: calc(var(--tap-stagger) * 2);
          filter: brightness(90%);
          animation-name: tap-upper-3;
        }
        .finger:nth-child(4) {
          animation-delay: calc(var(--tap-stagger) * 3);
          filter: brightness(100%);
          animation-name: tap-upper-4;
        }
        @keyframes tap-upper-1 {
          0%, 50%, 100% {
            transform: rotate(10deg) scale(0.4);
          }
          40% {
            transform: rotate(50deg) scale(0.4);
          }
        }
        @keyframes tap-upper-2 {
          0%, 50%, 100% {
            transform: rotate(10deg) scale(0.6);
          }
          40% {
            transform: rotate(50deg) scale(0.6);
          }
        }
        @keyframes tap-upper-3 {
          0%, 50%, 100% {
            transform: rotate(10deg) scale(0.8);
          }
          40% {
            transform: rotate(50deg) scale(0.8);
          }
        }
        @keyframes tap-upper-4 {
          0%, 50%, 100% {
            transform: rotate(10deg) scale(1);
          }
          40% {
            transform: rotate(50deg) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default Loading
