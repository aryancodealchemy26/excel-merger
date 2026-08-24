const fs = require('fs');
const path = require('path');

const structure = [
  'src/app.js',
  'src/config/env.js',
  'src/controllers/merge.controller.js',
  'src/routes/merge.routes.js',
  'src/services/excel.service.js',
  'src/services/validation.service.js',
  'src/middleware/upload.middleware.js',
  'src/middleware/error.middleware.js',
  'src/utils/file.utils.js',
  'src/utils/response.utils.js',
  'public/index.html',
  'public/css/style.css',
  'public/js/app.js',
  'tests/excel.service.test.js',
  'tests/validation.test.js',
  'uploads/.gitkeep',
  'outputs/.gitkeep',
  '.env',
  '.env.example',
  '.gitignore',
  'package.json',
  'package-lock.json',
  'README.md',
  'server.js'
];

structure.forEach((filePath) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, '');
  }
});

console.log('Folder structure generated successfully!');