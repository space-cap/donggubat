module.exports = {
  stylesheet: [],
  css: `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

    body {
      font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
      font-size: 11pt;
      line-height: 1.8;
      color: #1F3328;
      max-width: 100%;
      padding: 0;
    }

    h1 {
      font-size: 20pt;
      font-weight: 700;
      color: #1F3328;
      border-bottom: 3px solid #2F5D43;
      padding-bottom: 8px;
      margin-top: 0;
    }

    h2 {
      font-size: 15pt;
      font-weight: 700;
      color: #2F5D43;
      border-bottom: 1.5px solid #ddd;
      padding-bottom: 5px;
      margin-top: 28px;
      page-break-after: avoid;
    }

    h3 {
      font-size: 12pt;
      font-weight: 600;
      color: #9A7B5C;
      margin-top: 18px;
      page-break-after: avoid;
    }

    blockquote {
      border-left: 4px solid #2F5D43;
      background: #f4f8f5;
      padding: 10px 16px;
      margin: 12px 0;
      font-style: normal;
      page-break-inside: avoid;
    }

    blockquote strong {
      color: #1F3328;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 10pt;
      page-break-inside: avoid;
    }

    th {
      background: #2F5D43;
      color: white;
      padding: 8px 10px;
      text-align: left;
      font-weight: 500;
    }

    td {
      padding: 7px 10px;
      border-bottom: 1px solid #e0e0e0;
    }

    tr:nth-child(even) td {
      background: #f9f9f7;
    }

    code {
      background: #f0ede6;
      padding: 2px 5px;
      border-radius: 3px;
      font-size: 10pt;
      color: #B86445;
    }

    pre {
      background: #f7f4ed;
      border: 1px solid #e0ddd6;
      border-radius: 6px;
      padding: 14px;
      font-size: 10pt;
      line-height: 1.6;
      page-break-inside: avoid;
    }

    pre code {
      background: none;
      padding: 0;
      color: #1F3328;
    }

    hr {
      border: none;
      border-top: 1px solid #ddd;
      margin: 24px 0;
    }

    ol, ul {
      padding-left: 22px;
    }

    li {
      margin-bottom: 4px;
    }

    strong {
      color: #1F3328;
    }

    a {
      color: #2F5D43;
      text-decoration: none;
    }

    @media print {
      h2 {
        page-break-before: auto;
      }
    }
  `,
  body_class: [],
  pdf_options: {
    format: 'A4',
    margin: {
      top: '20mm',
      bottom: '20mm',
      left: '18mm',
      right: '18mm'
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size:8pt; color:#999; width:100%; text-align:center; font-family:sans-serif;">동구밭 발표자용 전체 스크립트 v7-1</div>',
    footerTemplate: '<div style="font-size:8pt; color:#999; width:100%; text-align:center; font-family:sans-serif;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
  },
  marked_options: {},
  dest: './donggubat_presentation_script_v7_1.pdf'
};
