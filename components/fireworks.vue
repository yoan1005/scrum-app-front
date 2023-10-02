<template>
  <div class="fixed h-1/2 w-full bottom-0 left-0 right-0 z-50">
    <div class="firework-1"></div>
    <div class="firework-2"></div>
    <div class="firework-3"></div>
    <div class="firework-4"></div>
    <div class="firework-5"></div>
    <div class="firework-6"></div>
    <div class="firework-7"></div>
    <div class="firework-8"></div>
    <div class="firework-9"></div>
    <div class="firework-10"></div>
    <div class="firework-11"></div>
    <div class="firework-12"></div>
    <div class="firework-13"></div>
    <div class="firework-14"></div>
    <div class="firework-15"></div>
  </div>
</template>

<style scoped>
html {
  font-size: calc(100vmax / 1500 * 100);
}
[class^="firework-"] {
  position: absolute;
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
}

.firework-1 {
  -webkit-animation: firework-lg 1.2s both infinite;
  animation: firework-lg 1.2s both infinite;
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
  top: 50%;
  left: 80%;
}

.firework-2 {
  -webkit-animation: firework-md 1.2s both infinite;
  animation: firework-md 1.2s both infinite;
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
  top: 45%;
  left: 50%;
}

.firework-3 {
  -webkit-animation: firework-md 1.2s both infinite;
  animation: firework-md 1.2s both infinite;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
  top: 75%;
  left: 70%;
}

.firework-4 {
  -webkit-animation: firework-sm 1.2s both infinite;
  animation: firework-sm 1.2s both infinite;
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
  top: 60%;
  left: 45%;
}

.firework-5 {
  -webkit-animation: firework-lg 1.2s both infinite;
  animation: firework-lg 1.2s both infinite;
  -webkit-animation-delay: 1.2s;
  animation-delay: 1.2s;
  top: 75%;
  left: 55%;
}

.firework-6 {
  -webkit-animation: firework-md 1.2s both infinite;
  animation: firework-md 1.2s both infinite;
  -webkit-animation-delay: 1.2s;
  animation-delay: 1.2s;
  top: 90%;
  left: 75%;
}

.firework-7 {
  -webkit-animation: firework-sm 1.2s both infinite;
  animation: firework-sm 1.2s both infinite;
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
  top: 65%;
  left: 25%;
}

.firework-8 {
  -webkit-animation: firework-sm 1.2s both infinite;
  animation: firework-sm 1.2s both infinite;
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
  top: 35%;
  left: 70%;
}

.firework-9 {
  -webkit-animation: firework-sm 1.2s both infinite;
  animation: firework-sm 1.2s both infinite;
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
  top: 25%;
  left: 15%;
}

.firework-10 {
  -webkit-animation: firework-sm 1.2s both infinite;
  animation: firework-sm 1.2s both infinite;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
  top: 15%;
  left: 55%;
}

.firework-11 {
  -webkit-animation: firework-md 1.2s both infinite;
  animation: firework-md 1.2s both infinite;
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
  top: 80%;
  left: 45%;
}

.firework-12 {
  -webkit-animation: firework-md 1.2s both infinite;
  animation: firework-md 1.2s both infinite;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
  top: 85%;
  left: 55%;
}

.firework-13 {
  -webkit-animation: firework-lg 1.2s both infinite;
  animation: firework-lg 1.2s both infinite;
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
  top: 40%;
  left: 70%;
}

.firework-14 {
  -webkit-animation: firework-md 1.2s both infinite;
  animation: firework-md 1.2s both infinite;
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
  top: 45%;
  left: 70%;
}

.firework-15 {
  -webkit-animation: firework-md 1.2s both infinite;
  animation: firework-md 1.2s both infinite;
  -webkit-animation-delay: 1.1s;
  animation-delay: 1.1s;
  top: 35%;
  left: 35%;
}

@-webkit-keyframes firework-sm {
  0%,
  100% {
    opacity: 0;
  }
  10%,
  70% {
    opacity: 1;
  }
  100% {
    box-shadow: -0.5rem 0rem 0 #bf4eac, 0.5rem 0rem 0 #bf4eac,
      0rem -0.5rem 0 #bf4eac, 0rem 0.5rem 0 #bf4eac, 0.35rem -0.35rem 0 #bf4eac,
      0.35rem 0.35rem 0 #bf4eac, -0.35rem -0.35rem 0 #bf4eac,
      -0.35rem 0.35rem 0 #bf4eac;
  }
}

@keyframes firework-sm {
  0%,
  100% {
    opacity: 0;
  }
  10%,
  70% {
    opacity: 1;
  }
  100% {
    box-shadow: -0.5rem 0rem 0 #d9a78b, 0.5rem 0rem 0 #d9a78b,
      0rem -0.5rem 0 #d9a78b, 0rem 0.5rem 0 #d9a78b, 0.35rem -0.35rem 0 #d9a78b,
      0.35rem 0.35rem 0 #d9a78b, -0.35rem -0.35rem 0 #d9a78b,
      -0.35rem 0.35rem 0 #d9a78b;
  }
}
@-webkit-keyframes firework-md {
  0%,
  100% {
    opacity: 0;
  }
  10%,
  70% {
    opacity: 1;
  }
  100% {
    box-shadow: -0.7rem 0rem 0 #d96a88, 0.7rem 0rem 0 #d96a88,
      0rem -0.7rem 0 #d96a88, 0rem 0.7rem 0 #d96a88, 0.49rem -0.49rem 0 #d96a88,
      0.49rem 0.49rem 0 #d96a88, -0.49rem -0.49rem 0 #d96a88,
      -0.49rem 0.49rem 0 #d96a88;
  }
}
@keyframes firework-md {
  0%,
  100% {
    opacity: 0;
  }
  10%,
  70% {
    opacity: 1;
  }
  100% {
    box-shadow: -0.7rem 0rem 0 #fff, 0.7rem 0rem 0 #fff, 0rem -0.7rem 0 #fff,
      0rem 0.7rem 0 #fff, 0.49rem -0.49rem 0 #fff, 0.49rem 0.49rem 0 #fff,
      -0.49rem -0.49rem 0 #fff, -0.49rem 0.49rem 0 #fff;
  }
}
@-webkit-keyframes firework-lg {
  0%,
  100% {
    opacity: 0;
  }
  10%,
  70% {
    opacity: 1;
  }
  100% {
    box-shadow: -0.9rem 0rem 0 #000, 0.9rem 0rem 0 #000, 0rem -0.9rem 0 #000,
      0rem 0.9rem 0 #000, 0.63rem -0.63rem 0 #000, 0.63rem 0.63rem 0 #000,
      -0.63rem -0.63rem 0 #000, -0.63rem 0.63rem 0 #000;
  }
}
@keyframes firework-lg {
  0%,
  100% {
    opacity: 0;
  }
  10%,
  70% {
    opacity: 1;
  }
  100% {
    box-shadow: -0.9rem 0rem 0 #d96a88, 0.9rem 0rem 0 #d96a88,
      0rem -0.9rem 0 #d96a88, 0rem 0.9rem 0 #d96a88, 0.63rem -0.63rem 0 #d96a88,
      0.63rem 0.63rem 0 #d96a88, -0.63rem -0.63rem 0 #d96a88,
      -0.63rem 0.63rem 0 #d96a88;
  }
}
</style>
