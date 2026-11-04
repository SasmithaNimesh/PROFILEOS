import { Document, Paragraph, TextRun, HeadingLevel, Packer, AlignmentType, BorderStyle } from 'docx';
import { UserProfile, CVDocument, CoverLetterDocument } from '../types/profile';

export async function exportCVToDocx(profile: UserProfile, cv: CVDocument): Promise<void> {
  const sectionsChildren: any[] = [];

  // Header: Name
  sectionsChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: profile.fullName.toUpperCase(),
          bold: true,
          size: 32, // 16pt
          font: 'Arial',
        }),
      ],
    })
  );

  // Subtitle / Target Role
  sectionsChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: cv.targetRole || profile.headline,
          italics: true,
          size: 24, // 12pt
          color: '4A5568',
          font: 'Arial',
        }),
      ],
    })
  );

  // Contact line
  const contactParts = [profile.email, profile.phone, profile.location, profile.website].filter(Boolean);
  sectionsChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [
        new TextRun({
          text: contactParts.join('  •  '),
          size: 18, // 9pt
          color: '718096',
          font: 'Arial',
        }),
      ],
    })
  );

  // Helper for Section Heading
  const addSectionHeading = (title: string) => {
    sectionsChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
        border: {
          bottom: {
            color: '18181B',
            space: 4,
            style: BorderStyle.SINGLE,
            size: 12,
          },
        },
        children: [
          new TextRun({
            text: title.toUpperCase(),
            bold: true,
            size: 22, // 11pt
            color: '1A202C',
            font: 'Arial',
          }),
        ],
      })
    );
  };

  // Summary
  if (cv.sections.summary && cv.summary) {
    addSectionHeading('Professional Summary');
    sectionsChildren.push(
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: cv.summary,
            size: 20, // 10pt
            font: 'Arial',
          }),
        ],
      })
    );
  }

  // Experience
  if (cv.sections.experience && profile.experiences.length > 0) {
    addSectionHeading('Professional Experience');
    profile.experiences.forEach((exp) => {
      sectionsChildren.push(
        new Paragraph({
          spacing: { before: 140, after: 40 },
          children: [
            new TextRun({
              text: exp.title,
              bold: true,
              size: 21,
              font: 'Arial',
            }),
            new TextRun({
              text: `  |  ${exp.company} (${exp.location})`,
              size: 20,
              color: '4A5568',
              font: 'Arial',
            }),
            new TextRun({
              text: `\t${exp.startDate} – ${exp.isCurrent ? 'Present' : exp.endDate}`,
              italics: true,
              size: 19,
              color: '718096',
              font: 'Arial',
            }),
          ],
        })
      );

      if (exp.description) {
        sectionsChildren.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: exp.description,
                size: 19,
                font: 'Arial',
              }),
            ],
          })
        );
      }

      exp.bulletPoints.forEach((point) => {
        sectionsChildren.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: point,
                size: 19,
                font: 'Arial',
              }),
            ],
          })
        );
      });
    });
  }

  // Projects
  if (cv.sections.projects && profile.projects.length > 0) {
    addSectionHeading('Selected Technical Projects');
    profile.projects.forEach((proj) => {
      sectionsChildren.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({
              text: proj.title,
              bold: true,
              size: 20,
              font: 'Arial',
            }),
            new TextRun({
              text: proj.tags.length ? ` [${proj.tags.join(', ')}]` : '',
              color: '4A5568',
              size: 18,
              font: 'Arial',
            }),
          ],
        })
      );

      sectionsChildren.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: proj.description,
              size: 19,
              font: 'Arial',
            }),
          ],
        })
      );

      proj.highlights.forEach((h) => {
        sectionsChildren.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: h,
                size: 19,
                font: 'Arial',
              }),
            ],
          })
        );
      });
    });
  }

  // Education
  if (cv.sections.education && profile.educations.length > 0) {
    addSectionHeading('Education');
    profile.educations.forEach((edu) => {
      sectionsChildren.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: `${edu.degree} in ${edu.fieldOfStudy}`,
              bold: true,
              size: 20,
              font: 'Arial',
            }),
            new TextRun({
              text: `  |  ${edu.institution}`,
              size: 19,
              color: '4A5568',
              font: 'Arial',
            }),
            new TextRun({
              text: `\t${edu.startDate} – ${edu.endDate}`,
              italics: true,
              size: 18,
              color: '718096',
              font: 'Arial',
            }),
          ],
        })
      );
      if (edu.grade) {
        sectionsChildren.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: `Honors / GPA: ${edu.grade}`,
                italics: true,
                size: 18,
                color: '4A5568',
                font: 'Arial',
              }),
            ],
          })
        );
      }
    });
  }

  // Skills
  if (cv.sections.skills && profile.skills.length > 0) {
    addSectionHeading('Skills & Competencies');
    const skillList = profile.skills.map(s => s.name).join('  •  ');
    sectionsChildren.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: skillList,
            size: 19,
            font: 'Arial',
          }),
        ],
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: sectionsChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${profile.fullName.replace(/\s+/g, '_')}_CV.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function exportCoverLetterToDocx(profile: UserProfile, letter: CoverLetterDocument): Promise<void> {
  const sectionsChildren: any[] = [];

  // Sender Header
  sectionsChildren.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: profile.fullName,
          bold: true,
          size: 28, // 14pt
          font: 'Arial',
        }),
      ],
    })
  );

  const contactLine = [profile.email, profile.phone, profile.location, profile.website].filter(Boolean).join('  •  ');
  sectionsChildren.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 240 },
      children: [
        new TextRun({
          text: contactLine,
          size: 18, // 9pt
          color: '718096',
          font: 'Arial',
        }),
      ],
    })
  );

  // Date
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  sectionsChildren.push(
    new Paragraph({
      spacing: { after: 180 },
      children: [
        new TextRun({
          text: dateStr,
          size: 20,
          font: 'Arial',
        }),
      ],
    })
  );

  // Recipient block
  sectionsChildren.push(
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: `Hiring Team / Engineering Leadership`,
          bold: true,
          size: 20,
          font: 'Arial',
        }),
      ],
    })
  );
  if (letter.company) {
    sectionsChildren.push(
      new Paragraph({
        spacing: { after: 180 },
        children: [
          new TextRun({
            text: letter.company,
            size: 20,
            font: 'Arial',
          }),
        ],
      })
    );
  }

  // Subject line
  if (letter.jobTitle) {
    sectionsChildren.push(
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: `RE: Application for ${letter.jobTitle}`,
            bold: true,
            size: 22,
            font: 'Arial',
          }),
        ],
      })
    );
  }

  // Body Paragraphs
  const paragraphs = letter.content.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  paragraphs.forEach(p => {
    sectionsChildren.push(
      new Paragraph({
        spacing: { after: 140 },
        children: [
          new TextRun({
            text: p,
            size: 21, // ~10.5pt
            font: 'Arial',
          }),
        ],
      })
    );
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: sectionsChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const safeCompany = (letter.company || 'Application').replace(/\s+/g, '_');
  link.download = `${profile.fullName.replace(/\s+/g, '_')}_${safeCompany}_Cover_Letter.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

