document.addEventListener("DOMContentLoaded", function() {
  const distritos = [
      "Higiene Facial",
      "Laminado de Cejas",
      "Lifting de Pestañas",
      "Epilación de Bozo",
      "Epilación de Cejas",
      "Depilación de Piernas",
      "Depilación Corporal",
      "Diseño de Cejas",
      "Tratamiento con Dermapen",
      "Pestañas por Punto"
  ];

  const districtSelect = document.getElementById("district");
  distritos.sort().forEach(distrito => {
      const option = document.createElement("option");
      option.value = distrito;
      option.textContent = distrito;
      districtSelect.appendChild(option);
  });

  const timeSelect = document.getElementById("time");
  const startHour = 8;
  const endHour = 17;

  for (let hour = startHour; hour <= endHour; hour++) {
      let option = document.createElement("option");
      const hourFormatted = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      option.value = hourFormatted;
      option.textContent = hourFormatted;
      timeSelect.appendChild(option);

      if (hour !== endHour) {
          option = document.createElement("option");
          const halfHourFormatted = hour < 10 ? `0${hour}:30` : `${hour}:30`;
          option.value = halfHourFormatted;
          option.textContent = halfHourFormatted;
          timeSelect.appendChild(option);
      }
  }
  
  const form = document.getElementById("contact-form");
  
  form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const formData = {
          name: document.getElementById("name").value,
          phone: document.getElementById("telefono").value,
          district: document.getElementById("district").value,
          address: document.getElementById("address").value,
          date: document.getElementById("date").value,
          time: document.getElementById("time").value.toString()
      };
      
      fetch('https://hook.us1.make.com/2jpe9a5at83hleb3lghky0axp939oqpz', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify(formData, (key, value) => {
              if (key === 'time') {
                  return String(value);
              }
              return value;
          })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Error en la solicitud, código: ' + response.status);
          }
          return response.text();
      })
      .then(data => {
          if (data === "Accepted" || JSON.parse(data)) {
              Swal.fire({
                  icon: 'success',
                  title: '¡Cita agendada!',
                  text: 'Tu cita ha sido registrada exitosamente.',
                  confirmButtonColor: '#05642d',
                  background: '#1a1a1a',
                  color: '#ffffff',
                  iconColor: '#00ff00'
              });
              form.reset();
          }
      })
      .catch((error) => {
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al enviar los datos. Intenta nuevamente.',
              confirmButtonColor: '#05642d',
              background: '#1a1a1a',
              color: '#ffffff'
          });
      });
  });
});