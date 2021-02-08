window.addEventListener('DOMContentLoaded', () => {
    const XLSX = require('xlsx');
    const { jsPDF } = require('jspdf');
    require('jspdf-autotable');
    window.XLSX = XLSX;
    window.jsPDF = jsPDF;
});
