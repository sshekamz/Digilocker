window.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const fileListElement = document.getElementById('fileList');
  
    uploadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const file = fileInput.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
  
        fetch('/api/files/upload', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = data.filename;
            link.href = `/api/files/${data.filename}`;
            listItem.appendChild(link);
            fileListElement.appendChild(listItem);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    });
  
    fetch('/api/files')
      .then(response => response.json())
      .then(data => {
        data.files.forEach(filename => {
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          link.textContent = filename;
          link.href = `/api/files/${filename}`;
          listItem.appendChild(link);
          fileListElement.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  