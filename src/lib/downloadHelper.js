/**
 * Triggers a client-side file download with a guaranteed, custom filename.
 * Converts cross-origin URLs (e.g. Supabase storage) to local Blobs so browsers
 * strictly respect the `download` filename instead of default hashed/timestamped filenames.
 */
export async function downloadResumeFile(
  url = '/Mahmud_Hasan_Ratul_CV.pdf', 
  filename = 'Mahmud_Hasan_Ratul_Resume.pdf'
) {
  if (typeof window === 'undefined') return;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 2000);
  } catch (err) {
    console.warn('Client blob download failed, falling back to direct anchor:', err);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.target = '_blank';
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
