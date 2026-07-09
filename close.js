<script>
    document.addEventListener('DOMContentLoaded', function() {
      // Inisialisasi jawaban
      const answers = { '1': null, '2': null, '3': null, '4': null, '5': null };

      // Definisi tipe kepribadian
      const personalities = {
        'A': { name: 'DITAHAN', count: 0, color: '#000000' },
        'B': { name: 'DILAPORKAN', count: 0, color: '#E44A99' },
        'C': { name: 'DIJADIKAN TERSANGKA', count: 0, color: '#01AA13' },
        'D': { name: 'DIJERAT PASAL', count: 0, color: '#0F0E83' }
      };

      // Deskripsi hasil
      const descriptions = {
        'A': 'Seperti admin akun media sosial Khariq Anwar @aliansimahasiswapenggugat serta admin akun @bekasi_menggugat, anda kemungkinan akan ditangkap setelah menyuarakan dukungan terhadap aksi demonstrasi demonstrasi Agustus 2025 di media sosial dengan jeratan pasal Undang-undang tentang Informasi dan Transaksi Elektronik (ITE), Pasal 160, dan Pasal 161 Ayat 1 KUHP.',
        'B': '⁠Apa yang kamu lakukan dapat menyebabkan kamu dilaporkan ke pihak berwajib seperti halnya akun X dari @hourly_absurd_2, @lantip, @mbakdeden dan @txtdrjkt serta akun Facebook dari Gosip Artis Indonesia yang hanya membuat dan membagikan ulang meme Bahlil Lahadalia (Menteri Energi dan Sumber Daya Mineral).',
        'C': 'Gerakanmu mungkin akan bernasib sama seperti akun TikTok @cecepmunich dan @TMG yang dijadikan tersangka karena diduga menyebarkan konten yang mengajak masyarakat untuk ikut serta dalam aksi. Mereka dijadikan tersangka dengan pasal 161 ayat 1 KUHP dengan ancaman pidana paling lama 4 tahun dan diwajibkan melapor 2 kali dalam sepekan.',
        'D': 'Seperti Syahdan selaku admin @gejayanmemanggil dan Laras Faizati Khairunisa yang sangat vokal dan aktif dalam menyebarkan ajakan aksi, kamu kemungkinan akan dijerat dengan Pasal 160 KUHP, pasal 45A ayat 3 juncto, Pasal 28 ayat 3 UU ITE, dan atau Pasal 76H juncto, Pasal 15 juncto, Pasal 87 UU Perlindungan Anak, Pasal 48 ayat 1 Jo, Pasal 32 ayat 1, Undang-undang Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik (ITE), Pasal 45A ayat 2 Jo, Pasal 28 ayat 2 UU Nomor 1 Tahun 2024 tentang ITE, Pasal 160 KUHP dan Pasal 161 ayat 1 KUHP.'
      };

      // Elemen DOM
      const progressFill = document.getElementById('progress-fill');
      const progressText = document.getElementById('progress-text');
      const questionContainers = document.querySelectorAll('.question-container');
      const resultContainer = document.getElementById('result-container');
      const personalityResult = document.getElementById('personality-result');
      const personalityDesc = document.getElementById('personality-desc');
      const restartBtn = document.getElementById('restart-btn');

      // Update progress bar
      function updateProgress(currentQuestion) {
        const progress = ((currentQuestion - 1) / 5) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Pertanyaan ${currentQuestion} dari 5`;
      }

      // Tampilkan pertanyaan
      function showQuestion(questionNumber) {
        questionContainers.forEach(c => c.classList.remove('active'));
        document.getElementById(`question-${questionNumber}`).classList.add('active');
        updateProgress(questionNumber);
      }

      // Pilih opsi
      function selectOption(questionNumber, optionElement, value) {
        document.querySelectorAll(`#question-${questionNumber} .option`).forEach(o => o.classList.remove('selected'));
        optionElement.classList.add('selected');
        answers[questionNumber] = value;
      }

      // Hitung hasil
      function calculateResults() {
        Object.keys(personalities).forEach(k => personalities[k].count = 0);

        Object.values(answers).forEach(answer => {
          if (answer && personalities[answer]) {
            personalities[answer].count++;
          }
        });

        const totalQuestions = 5;
        let maxPercentage = 0;
        let dominant = '';

        Object.keys(personalities).forEach(k => {
          const percentage = (personalities[k].count / totalQuestions) * 100;
          document.getElementById(`percent-${k}`).textContent = `${percentage}%`;
          document.getElementById(`bar-${k}`).style.width = `${percentage}%`;

          if (percentage > maxPercentage) {
            maxPercentage = percentage;
            dominant = k;
          }
        });

        personalityResult.textContent = personalities[dominant].name;
        personalityResult.style.background = personalities[dominant].color;
        personalityDesc.textContent = descriptions[dominant];
        resultContainer.style.display = 'block';
      }

      // Event listener opsi
      document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
          const qContainer = this.closest('.question-container');
          const qNumber = qContainer.id.split('-')[1];
          const value = this.getAttribute('data-value');
          selectOption(qNumber, this, value);
        });
      });

      // Navigasi antar pertanyaan
      document.getElementById('next-btn').addEventListener('click', () => showQuestion(2));
      document.getElementById('prev-btn-2').addEventListener('click', () => showQuestion(1));
      document.getElementById('next-btn-2').addEventListener('click', () => showQuestion(3));
      document.getElementById('prev-btn-3').addEventListener('click', () => showQuestion(2));
      document.getElementById('next-btn-3').addEventListener('click', () => showQuestion(4));
      document.getElementById('prev-btn-4').addEventListener('click', () => showQuestion(3));
      document.getElementById('next-btn-4').addEventListener('click', () => showQuestion(5));
      document.getElementById('prev-btn-5').addEventListener('click', () => showQuestion(4));

      // Submit hasil
      document.getElementById('submit-btn').addEventListener('click', function() {
        const allAnswered = Object.values(answers).every(a => a !== null);
        if (allAnswered) {
          calculateResults();
        } else {
          alert('Silakan jawab semua pertanyaan sebelum melihat hasil!');
        }
      });

      // Restart tes
      restartBtn.addEventListener('click', function() {
        Object.keys(answers).forEach(k => answers[k] = null);
        document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
        document.querySelectorAll('.bar-fill').forEach(b => b.style.width = '0%');
        document.querySelectorAll('[id^="percent-"]').forEach(el => el.textContent = '0%');
        resultContainer.style.display = 'none';
        showQuestion(1);
      });

      // Inisialisasi
      showQuestion(1);
    });
  </script>
</body>
</html>
