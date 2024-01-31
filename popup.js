document.getElementById('increase').addEventListener('click', function () {
    changeBlattNumber(1);
  });
  
  document.getElementById('decrease').addEventListener('click', function () {
    changeBlattNumber(-1);
  });
  
  function changeBlattNumber(delta) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = tabs[0].url;
      const regex = /Blatt(\d{2})/;
      const match = regex.exec(currentUrl);
  
      if (match) {
        const currentNumber = parseInt(match[1]);
        let newNumber = currentNumber + delta;
  
        // Ensure the new number stays within the two-digit range
        if (newNumber < 1) {
          newNumber = 1;
        } else if (newNumber > 99) {
          newNumber = 99;
        }
  
        // Format the new number with leading zeros if needed
        const formattedNumber = newNumber.toString().padStart(2, '0');
  
        const newUrl = currentUrl.replace(regex, 'Blatt' + formattedNumber);
        chrome.tabs.update(tabs[0].id, { url: newUrl });
      }
    });
  }
  