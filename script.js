document.getElementById('convertBtn').addEventListener('click', async () => {
    const input = document.getElementById('imageInput');
    const caption = document.getElementById('caption').value.trim();
  
    if (input.files.length === 0) {
      alert('Por favor, selecione pelo menos uma imagem.');
      return;
    }
  
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
  
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
  
        img.onload = function () {
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = img.width;
          const imgHeight = img.height;
          const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
  
          const width = imgWidth * ratio;
          const height = imgHeight * ratio;
          const x = (pageWidth - width) / 2;
          const y = (pageHeight - height) / 2;
  
          // Adiciona a imagem no PDF
          pdf.addImage(img, 'JPEG', x, y, width, height);
  
          // Adiciona uma nova página, exceto para a última imagem
          if (i < input.files.length - 1) {
            pdf.addPage();
          }
  
          // Salva o PDF com o nome digitado no campo de legenda
          if (i === input.files.length - 1) {
            const fileName = caption || 'imagens'; // Usa o texto do campo ou um nome padrão
            pdf.save(`${fileName}.pdf`);
          }
        };
      };
  
      reader.readAsDataURL(file);
    }
  });
  