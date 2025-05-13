import { NextRequest, NextResponse } from 'next/server';
import puppeteer, { type Browser, type Page } from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { format } from 'date-fns';

export async function POST(req: NextRequest) {
  let browser: Browser | null = null;
  try {
    const { 
      username, 
      handle, 
      verified, 
      date, 
      content, 
      footer, 
      avatarSrc,
      theme, 
      aspectRatio,
    } = await req.json();
    
    // Load Inter font (Latin characters primarily)
    await chromium.font('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfAZ9hjg.woff2'); // Inter Regular
    // Load Noto Sans SC (Simplified Chinese characters)
    await chromium.font('https://fonts.gstatic.com/s/notosanssc/v30/k3kXo84MPvpLmixcA63oeALZKLdUwfRrm8_v.woff2'); // Noto Sans SC Regular

    const executablePath = await chromium.executablePath();

    browser = await puppeteer.launch({ 
      args: chromium.args,
      executablePath,
      headless: chromium.headless, 
    });
    
    const page: Page = await browser.newPage();
    
    const [ratioWidth, ratioHeight] = aspectRatio.split(':').map(Number);
    let baseWidth: number;

    // Match frontend's getAspectRatioStyle maxWidth logic
    if (aspectRatio === '3:4' || aspectRatio === '9:16') {
      baseWidth = 450;
    } else {
      baseWidth = 600; // Default maxWidth for other ratios like 1:1, 4:3, 16:9
    }
    const baseHeight = Math.floor(baseWidth * (ratioHeight / ratioWidth));
    
    await page.setViewport({ 
      width: baseWidth, 
      height: baseHeight,
      deviceScaleFactor: 2 // Render at 2x resolution for quality
    });
    
    let borderRadius = '0.5rem'; // Default from rounded-lg
    if (theme.id === 'cosmic-purple' || theme.id === 'glass-dark') {
      borderRadius = '1rem'; // rounded-2xl
    } else if (theme.id === 'clean-light') { // Assuming a theme not shown but for completeness
      borderRadius = '0.75rem'; // rounded-xl
    }
    
    let shadow = 'box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);'; // Default shadow-xl
    if (theme.id === 'cosmic-purple') {
      shadow = 'box-shadow: 0 10px 15px -3px rgba(139, 92, 246, 0.3), 0 4px 6px -2px rgba(139, 92, 246, 0.2);'; // Adjusted for purple glow
    } else if (theme.id === 'glass-dark') {
      shadow = 'box-shadow: 0 20px 25px -5px rgba(30, 58, 138, 0.2), 0 10px 10px -5px rgba(30, 58, 138, 0.1);'; // Adjusted for blue glow
    } else if (theme.id === 'twitter-dark'){
      shadow = 'box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);'; // shadow-md
    }
        
    const cardPadding = aspectRatio === '9:16' || aspectRatio === '3:4' ? '1rem' : '1.5rem'; // p-4 vs p-6
    const headerMarginBottom = aspectRatio === '9:16' || aspectRatio === '3:4' ? '0.75rem' : '1rem'; // mb-3 vs mb-4
    const footerFontSize = aspectRatio === '9:16' || aspectRatio === '3:4' ? '0.75rem' : '0.875rem'; // text-xs vs text-sm
    const footerPaddingTop = aspectRatio === '9:16' || aspectRatio === '3:4' ? '0.75rem' : '1rem'; // pt-3 vs pt-4
    const footerMarginTop = aspectRatio === '9:16' || aspectRatio === '3:4' ? '0.75rem' : '1rem'; // mt-3 vs mt-4
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body { width: 100%; height: 100%; font-family: 'Noto Sans SC', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: black; overflow: hidden; }
            .card {
              width: 100%; height: 100%; display: flex; flex-direction: column;
              padding: ${cardPadding};
              border-radius: ${borderRadius};
              ${shadow}
              overflow: hidden; position: relative;
            }
            .frosted-silver { background: linear-gradient(135deg, rgba(17,24,39,0.9), rgba(31,41,55,0.9), rgba(17,24,39,0.9)); color: rgb(209,213,219); border: 1px solid rgba(75,85,99,0.5); }
            .cosmic-purple { background: linear-gradient(135deg, rgb(88,28,135), rgb(49,46,129), rgb(76,29,149)); color: rgb(224,231,255); border: 1px solid rgba(139,92,246,0.3); position: relative; overflow: hidden; }
            .cosmic-purple::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 30% 20%, rgba(120,80,255,0.15) 0%, transparent 60%); z-index: 0; }
            .cosmic-purple::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 70% 60%, rgba(60,60,255,0.1) 0%, transparent 50%); z-index: 0; }
            .glass-dark { background-color: rgba(3,7,18,0.9); color: rgb(229,231,235); border: 1px solid rgba(31,41,55,0.5); }
            .twitter-dark { background-color: #000000; color: rgb(229,231,235); border: 1px solid rgb(31,41,55); }
            
            .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: ${headerMarginBottom}; position: relative; z-index: 1; flex-shrink: 0; }
            .user-info { display: flex; align-items: center; }
            .avatar { width: 48px; height: 48px; min-width: 48px; min-height: 48px; border-radius: 0.5rem; margin-right: 0.75rem; background-size: cover; background-position: center; background-color: #333; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
            .user-details { display: flex; flex-direction: column; }
            .username { font-weight: bold; display: flex; align-items: center; white-space: nowrap; }
            .verified-badge { width: 16px; height: 16px; border-radius: 50%; background-color: rgb(59,130,246); display: flex; align-items: center; justify-content: center; margin-left: 4px; font-size: 10px; }
            .verified-badge::before { content: '✓'; color: white; font-size: 10px; line-height: 1; }
            .card-date { /* Dynamically colored by theme-specific CSS below */ }

            .card-content {
              flex: 1 1 auto; /* Grow to fill available space */
              display: flex; /* Establishes a flex formatting context */
              align-items: center; /* Vertically centers .markdown-wrapper if it's shorter */
              justify-content: center; /* Horizontally centers .markdown-wrapper if it's narrower */
              overflow-y: auto; /* Allows scrolling if content overflows */
              -ms-overflow-style: none; scrollbar-width: none;
              position: relative; z-index: 1;
            }
            .card-content::-webkit-scrollbar { display: none; }
            .markdown-wrapper { width: 100%; max-width: 100%; /* Ensure it doesn't exceed card content area */ }
            
            /* Base prose-sm like styles, text color will be overridden by theme */
            .markdown-content { font-size: 0.875rem; line-height: 1.7142857; /* Tailwind prose-sm line-height */ }
            .markdown-content h1 { font-size: 1.25em; font-weight: bold; margin-bottom: 0.5em; margin-top: 0; }
            .markdown-content h2 { font-size: 1.125em; font-weight: bold; margin-bottom: 0.5em; margin-top: 0.5em; }
            .markdown-content h3 { font-size: 1em; font-weight: bold; margin-bottom: 0.25em; margin-top: 0.5em; }
            .markdown-content strong { font-weight: 600; }
            .markdown-content ul, .markdown-content ol { padding-left: 1.5em; margin: 0.5em 0; }
            .markdown-content ul { list-style-type: disc; }
            .markdown-content ol { list-style-type: decimal; }
            .markdown-content li { margin: 0.25em 0 0.25em 1em; }
            .markdown-content blockquote { border-left-width: 2px; padding-left: 1em; font-style: italic; margin: 0.5em 0; /* border color from theme */ }
            .markdown-content p { margin-top: 0; margin-bottom: 0.75em; }

            .card-footer { border-top-width: 1px; text-align: center; padding-top: ${footerPaddingTop}; margin-top: ${footerMarginTop}; font-size: ${footerFontSize}; position: relative; z-index: 1; flex-shrink: 0; /* border color from theme */ }

            /* Theme-specific text and dynamic element colors */
            .frosted-silver .username, .frosted-silver .markdown-content h1, .frosted-silver .markdown-content h2, .frosted-silver .markdown-content h3 { color: ${theme.accentColor || 'white'}; }
            .frosted-silver .user-handle, .frosted-silver .card-date, .frosted-silver .card-footer { color: ${theme.secondaryTextColor || 'rgb(156,163,175)'}; }
            .frosted-silver .markdown-content { color: ${theme.textColor || 'rgb(209,213,219)'}; }
            .frosted-silver .markdown-content strong { color: ${theme.strongClass ? (theme.strongClass.includes('text-gray-100') ? 'rgb(243,244,246)': 'white') : 'rgb(229,231,235)'}; }
            .frosted-silver .markdown-content blockquote, .frosted-silver .card-footer { border-color: ${theme.borderClass ? (theme.borderClass.includes('border-gray-700') ? 'rgba(55,65,81,0.5)' : 'rgba(75,85,99,0.5)') : 'rgba(75,85,99,0.5)'}; }
            
            .cosmic-purple .username, .cosmic-purple .markdown-content h1, .cosmic-purple .markdown-content h2, .cosmic-purple .markdown-content h3 { color: ${theme.accentColor || 'white'}; }
            .cosmic-purple .user-handle, .cosmic-purple .card-date, .cosmic-purple .card-footer { color: ${theme.secondaryTextColor || 'rgb(196,181,253)'}; }
            .cosmic-purple .markdown-content { color: ${theme.textColor || 'rgb(224,231,255)'}; }
            .cosmic-purple .markdown-content strong { color: ${theme.strongClass ? (theme.strongClass.includes('text-purple-200') ? 'rgb(233,213,255)': 'white') : 'rgb(233,213,255)'}; }
            .cosmic-purple .markdown-content blockquote, .cosmic-purple .card-footer { border-color: ${theme.borderClass ? (theme.borderClass.includes('border-purple-700') ? 'rgba(126,34,206,0.5)' : 'rgba(139,92,246,0.5)') : 'rgba(139,92,246,0.5)'}; }
            
            .glass-dark .username, .glass-dark .markdown-content h1, .glass-dark .markdown-content h2, .glass-dark .markdown-content h3 { color: ${theme.accentColor || 'rgb(96,165,250)'}; }
            .glass-dark .user-handle, .glass-dark .card-date, .glass-dark .card-footer { color: ${theme.secondaryTextColor || 'rgb(156,163,175)'}; }
            .glass-dark .markdown-content { color: ${theme.textColor || 'rgb(229,231,235)'}; }
            .glass-dark .markdown-content strong { color: ${theme.strongClass ? (theme.strongClass.includes('text-white') ? 'white': 'rgb(229,231,235)') : 'white'}; }
            .glass-dark .markdown-content blockquote, .glass-dark .card-footer { border-color: ${theme.borderClass ? (theme.borderClass.includes('border-gray-800') ? 'rgb(31,41,55)': 'rgba(31,41,55,0.5)') : 'rgb(31,41,55)'}; }
            
            .twitter-dark .username, .twitter-dark .markdown-content h1, .twitter-dark .markdown-content h2, .twitter-dark .markdown-content h3 { color: ${theme.accentColor || 'white'}; }
            .twitter-dark .user-handle, .twitter-dark .card-date, .twitter-dark .card-footer { color: ${theme.secondaryTextColor || 'rgb(107,114,128)'}; }
            .twitter-dark .markdown-content { color: ${theme.textColor || 'rgb(229,231,235)'}; }
            .twitter-dark .markdown-content strong { color: ${theme.strongClass ? (theme.strongClass.includes('text-blue-400') ? 'rgb(96,165,250)': 'white') : 'rgb(96,165,250)'}; }
            .twitter-dark .markdown-content blockquote, .twitter-dark .card-footer { border-color: ${theme.borderClass ? (theme.borderClass.includes('border-gray-800') ? 'rgb(31,41,55)': 'rgb(31,41,55)') : 'rgb(31,41,55)'}; }

          </style>
        </head>
        <body>
          <div id="card" class="card ${theme.id}">
            <div class="card-header">
              <div class="user-info">
                <div class="avatar" style="background-image: url('${avatarSrc}');"></div>
                <div class="user-details">
                  <div class="username">${username}${verified ? '<div class="verified-badge"></div>' : ''}</div>
                  <div class="user-handle">${handle}</div>
                </div>
              </div>
              <div class="card-date">${format(new Date(date), 'yyyy/MM/dd')}</div>
            </div>
            <div class="card-content">
              <div class="markdown-wrapper">
                <div class="markdown-content">
                  ${renderEnhancedMarkdown(content)}
                </div>
              </div>
            </div>
            <div class="card-footer">${footer}</div>
          </div>
        </body>
      </html>
    `;
        
    const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;
    await page.goto(dataUrl, { waitUntil: 'networkidle0', timeout: 20000 });
    
    await page.evaluate(() => document.fonts.ready);
    await new Promise(resolve => setTimeout(resolve, 500)); // Additional wait for any final rendering

    const cardElement = await page.$('#card');
    if (!cardElement) { throw new Error('Card element not found'); }
    
    const screenshot = await cardElement.screenshot({ type: 'png', omitBackground: false });
    
    return new NextResponse(screenshot, {
      headers: { 'Content-Type': 'image/png', 'Content-Disposition': `attachment; filename="social-card-${format(new Date(date), 'yyyy-MM-dd')}.png"` }
    });
  } catch (error) {
    console.error('Error generating card image:', error);
    return NextResponse.json(
      { error: 'Failed to generate card image', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

function renderEnhancedMarkdown(text: string): string {
  if (!text) return '';
  return text
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
    .split('\n\n')
    .map(paragraph => {
      if (paragraph.trim().startsWith('<') || paragraph.trim().length === 0) return paragraph;
      if (paragraph.trim().match(/^[\-\*] /m)) {
        const listItems = paragraph.split('\n').map(line => {
          const trimmed = line.trim();
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) return `<li>${trimmed.substring(2)}</li>`;
          return line; // Should not happen in a well-formed list block
        }).join('');
        return `<ul>${listItems}</ul>`;
      }
      return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`; // Preserve single line breaks within paragraphs
    })
    .join('');
} 