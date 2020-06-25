
module.exports = () => {
    [].forEach.call( document.querySelectorAll('.phoneMask'), function(input) {

        let pos = 0;
        let mask = '+7 (111) 111-11-11'; // Задаем маску

        input.addEventListener('focus', function(event) {
            if (/[0-9\+\ \-\(\)]/.test(pos)) {
                let currentString = this.value;
                let currentLength = currentString.length;
                if (/[0-9]/.test(pos)) {
                    if (mask[currentLength] === '1') {
                        this.value = currentString;
                    } else {
                        for (var i = currentLength; i < mask.length; i++) {
                            if (mask[i] === '1') {
                                this.value = currentString;
                                break;
                            }
                            currentString += mask[i];
                        }
                    }
                }
            }
        });

        input.addEventListener('keydown', function(event) {
            if (!(event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Backspace' || event.key === 'Tab')) {
                event.preventDefault()
            }

            pos = event.key;

            if (/[0-9\+\ \-\(\)]/.test(pos)) {
                let currentString = this.value;
                let currentLength = currentString.length;
                if (/[0-9]/.test(pos)) {
                    if (mask[currentLength] === '1') {
                        this.value = currentString + pos;
                    } else {
                        for (let i = currentLength; i < mask.length; i++) {
                            if (mask[i] === '1') {
                                this.value = currentString + pos;
                                break;
                            }
                            currentString += mask[i];
                        }
                    }
                }
            }
        });
    });
};