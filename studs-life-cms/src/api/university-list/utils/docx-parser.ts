import JSZip from 'jszip';

export interface ParsedUniversityCountry {
  country: string;
  declaredCount: number;
  universities: string[];
}

export interface ParsedUniversityList {
  title: string;
  countries: ParsedUniversityCountry[];
  totalCountries: number;
  totalUniversities: number;
}

const countryHeaderPattern = /^(.+?)\s*\((\d+)\)\s*$/;
const numberedItemPattern = /^(\d+)[.)]\s*(.+)$/;

function decodeXmlText(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function extractParagraphText(paragraphXml: string): string {
  const textParts: string[] = [];
  const tokenPattern = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>|<w:tab\s*\/>|<w:br\s*\/>/g;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(paragraphXml)) !== null) {
    if (match[1] !== undefined) {
      textParts.push(decodeXmlText(match[1]));
    } else if (match[0].startsWith('<w:tab')) {
      textParts.push('\t');
    } else {
      textParts.push('\n');
    }
  }

  return textParts.join('').replace(/\s+/g, ' ').trim();
}

function extractParagraphs(documentXml: string): string[] {
  const paragraphs: string[] = [];
  const paragraphPattern = /<w:p\b[\s\S]*?<\/w:p>/g;
  let match: RegExpExecArray | null;

  while ((match = paragraphPattern.exec(documentXml)) !== null) {
    const text = extractParagraphText(match[0]);
    if (text) paragraphs.push(text);
  }

  return paragraphs;
}

export function parseUniversityParagraphs(paragraphs: string[]): ParsedUniversityList {
  const title = paragraphs[0] || 'University list';
  const countries: ParsedUniversityCountry[] = [];
  let currentCountry: ParsedUniversityCountry | null = null;

  for (const paragraph of paragraphs.slice(1)) {
    const countryMatch = paragraph.match(countryHeaderPattern);
    if (countryMatch) {
      currentCountry = {
        country: countryMatch[1].trim(),
        declaredCount: Number(countryMatch[2]),
        universities: [],
      };
      countries.push(currentCountry);
      continue;
    }

    const universityMatch = paragraph.match(numberedItemPattern);
    if (universityMatch && currentCountry) {
      currentCountry.universities.push(universityMatch[2].trim());
      continue;
    }

    if (currentCountry?.universities.length) {
      const lastIndex = currentCountry.universities.length - 1;
      currentCountry.universities[lastIndex] = `${currentCountry.universities[lastIndex]} ${paragraph}`.trim();
    }
  }

  return {
    title,
    countries,
    totalCountries: countries.length,
    totalUniversities: countries.reduce((sum, country) => sum + country.universities.length, 0),
  };
}

export async function parseUniversityDocx(buffer: Buffer): Promise<ParsedUniversityList> {
  const zip = await JSZip.loadAsync(buffer);
  const documentFile = zip.file('word/document.xml');

  if (!documentFile) {
    throw new Error('DOCX does not contain word/document.xml');
  }

  const documentXml = await documentFile.async('text');
  const paragraphs = extractParagraphs(documentXml);

  if (paragraphs.length === 0) {
    throw new Error('DOCX does not contain readable paragraphs');
  }

  return parseUniversityParagraphs(paragraphs);
}
