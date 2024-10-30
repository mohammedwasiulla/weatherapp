const toggleButton = document.getElementById('toggleButton');
    toggleButton.addEventListener('click', function () {
  // Body element ko target karte hain
    const body = document.body;
  
  // Agar body ka background color white hai ya set nahin hai, toh black karenge
  if (body.style.backgroundColor === 'black') {
    body.style.backgroundColor = 'white';
  } else {
    // Agar black nahi hai toh white karenge
    body.style.backgroundColor = 'black';
  }
});
'e177466e572d4138bb208c558e2a654b';