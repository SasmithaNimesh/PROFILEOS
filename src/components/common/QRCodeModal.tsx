import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { X, Download, Copy, Check, QrCode as QrIcon } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  subtitle?: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
  subtitle
}) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen || !url) return;

    // Generate SVG string
    QRCode.toString(url, {
      type: 'svg',
      margin: 2,
      color: {
        dark: '#FFFFFF',
        light: '#09090B'
      },
      errorCorrectionLevel: 'H'
    }).then((svg) => {
      setSvgContent(svg);
    }).catch(console.error);

    // Draw to hidden canvas for PNG download
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 1024,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      }).catch(console.error);
    }
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleDownloadSVG = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `profileos-${title.toLowerCase().replace(/\s+/g, '-')}-qr.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
  };

  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const pngUrl = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = `profileos-${title.toLowerCase().replace(/\s+/g, '-')}-qr-300dpi.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopySVG = () => {
    navigator.clipboard.writeText(svgContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-charcoal border border-border rounded-2xl shadow-modal overflow-hidden text-primary flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-primary-muted">
              <QrIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary">{title}</h3>
              <p className="text-[11px] text-primary-dim">{subtitle || 'Vector QR Code'}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-primary-dim hover:text-primary hover:bg-surface transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center">
          {/* QR Display Card */}
          <div className="p-5 rounded-2xl bg-obsidian border border-border flex flex-col items-center shadow-minimal">
            <div 
              className="w-56 h-56 [&>svg]:w-full [&>svg]:h-full [&>svg]:rounded-lg"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
            <div className="mt-4 text-center">
              <p className="font-mono text-[11px] text-primary-muted tracking-wide break-all max-w-[260px]">
                {url}
              </p>
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />

          {/* Quick URL Copy */}
          <div className="w-full mt-4 flex items-center justify-between px-3 py-2 rounded-xl bg-surface border border-border text-xs">
            <span className="font-mono text-[11px] text-primary-dim truncate max-w-[280px]">
              {url}
            </span>
            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-white transition-colors shrink-0 ml-2"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="w-full grid grid-cols-3 gap-2 mt-4">
            <button
              onClick={handleCopySVG}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-raised hover:bg-surface-hover border border-border text-xs text-primary transition-colors font-medium"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'SVG Code'}</span>
            </button>

            <button
              onClick={handleDownloadSVG}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-raised hover:bg-surface-hover border border-border text-xs text-primary transition-colors font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>SVG File</span>
            </button>

            <button
              onClick={handleDownloadPNG}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>300DPI PNG</span>
            </button>
          </div>
          <p className="text-[10px] text-primary-dim mt-3 text-center">
            Optimized for crisp vector scaling on print resumes, business cards, and slide decks.
          </p>
        </div>
      </div>
    </div>
  );
};

