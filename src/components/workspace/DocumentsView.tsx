import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { 
  FolderArchive, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Edit2, 
  FileText, 
  Globe, 
  Mail, 
  FileCheck, 
  Plus, 
  LayoutGrid, 
  List,
  ExternalLink,
  X,
  Check
} from 'lucide-react';
import { DocumentAsset } from '../../types/profile';

export const DocumentsView: React.FC = () => {
  const { 
    documents, 
    deleteDocument, 
    renameDocument, 
    setCurrentWorkspaceTab, 
    setCurrentView 
  } = useProfile();

  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState<string>('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredDocs = documents.filter((doc) => {
    const matchesFilter = filterType === 'all' || doc.type === filterType;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.meta.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStartRename = (doc: DocumentAsset) => {
    setRenamingId(doc.id);
    setRenameValue(doc.title);
  };

  const handleSaveRename = (id: string) => {
    if (renameValue.trim()) {
      renameDocument(id, renameValue.trim());
    }
    setRenamingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary">
            My Documents
          </h2>
          <p className="text-xs text-primary-muted mt-1">
            Central library of generated CVs, letters, published portfolios, and parsed credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentWorkspaceTab('cv-studio')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New CV</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-primary-dim absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-charcoal border border-border text-xs text-primary placeholder:text-primary-dim focus:border-accent-blue focus:outline-none"
          />
        </div>

        {/* Filter Tabs & View Mode */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-charcoal border border-border text-xs">
            {['all', 'cv', 'cover_letter', 'portfolio', 'imported'].map((ft) => (
              <button
                key={ft}
                onClick={() => setFilterType(ft)}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  filterType === ft ? 'bg-raised text-primary font-semibold' : 'text-primary-muted hover:text-primary'
                }`}
              >
                {ft === 'cover_letter' ? 'Letters' : ft}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-charcoal border border-border">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-raised text-accent-blue' : 'text-primary-muted'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-raised text-accent-blue' : 'text-primary-muted'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Document Content */}
      {filteredDocs.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-charcoal border border-border">
          <FolderArchive className="w-12 h-12 text-primary-dim mx-auto mb-3" />
          <h3 className="font-semibold text-sm text-primary">No documents match your query</h3>
          <p className="text-xs text-primary-muted mt-1">Start by generating an asset in one of the studios.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => {
            let typeIcon = <FileText className="w-5 h-5 text-accent-blue" />;
            if (doc.type === 'cover_letter') typeIcon = <Mail className="w-5 h-5 text-accent-violet" />;
            if (doc.type === 'portfolio') typeIcon = <Globe className="w-5 h-5 text-status-success" />;
            if (doc.type === 'imported') typeIcon = <FileCheck className="w-5 h-5 text-status-warning" />;

            return (
              <div
                key={doc.id}
                className="p-5 rounded-2xl bg-charcoal border border-border hover:border-accent-blue/40 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-raised border border-border/80">
                      {typeIcon}
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-raised border border-border text-primary-muted">
                      {doc.format}
                    </span>
                  </div>

                  {renamingId === doc.id ? (
                    <div className="flex items-center gap-1.5 my-1">
                      <input
                        type="text"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        className="px-2 py-1 rounded bg-raised border border-accent-blue text-xs text-primary w-full"
                        autoFocus
                      />
                      <button onClick={() => handleSaveRename(doc.id)} className="text-status-success p-1">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => setRenamingId(null)} className="text-primary-muted p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <h4 
                      onClick={() => {
                        if (doc.type === 'cv') setCurrentWorkspaceTab('cv-studio');
                        else if (doc.type === 'cover_letter') setCurrentWorkspaceTab('cover-letter-studio');
                        else if (doc.type === 'portfolio') setCurrentView('published-portfolio');
                      }}
                      className="text-sm font-semibold text-primary group-hover:text-accent-blue transition-colors cursor-pointer truncate"
                    >
                      {doc.title}
                    </h4>
                  )}

                  <p className="text-xs text-primary-muted mt-1 leading-snug">{doc.meta}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-[11px] text-primary-dim">
                  <span>{doc.updatedAt} · {doc.size}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartRename(doc)}
                      className="p-1 text-primary-dim hover:text-primary transition-colors"
                      title="Rename"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(doc.id)}
                      className="p-1 text-primary-dim hover:text-status-danger transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="rounded-2xl bg-charcoal border border-border overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-raised/70 border-b border-border text-primary-muted uppercase font-mono text-[10px]">
              <tr>
                <th className="p-4">Document</th>
                <th className="p-4">Type</th>
                <th className="p-4">Format</th>
                <th className="p-4">Updated</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-raised/40 transition-colors">
                  <td className="p-4 font-semibold text-primary">{doc.title}</td>
                  <td className="p-4 uppercase text-primary-muted">{doc.type}</td>
                  <td className="p-4 font-mono">{doc.format}</td>
                  <td className="p-4 text-primary-dim">{doc.updatedAt}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setConfirmDeleteId(doc.id)}
                      className="text-primary-dim hover:text-status-danger p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setConfirmDeleteId(null)} className="fixed inset-0 bg-black/75 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm rounded-2xl bg-charcoal border border-border p-6 shadow-2xl z-10 space-y-4">
            <h3 className="font-display font-semibold text-base text-primary">Delete Document?</h3>
            <p className="text-xs text-primary-muted">
              Are you sure you want to permanently remove this document from your library?
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 py-2 rounded-xl bg-raised border border-border text-xs text-primary font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteDocument(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="flex-1 py-2 rounded-xl bg-status-danger hover:bg-status-danger/90 text-white text-xs font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

