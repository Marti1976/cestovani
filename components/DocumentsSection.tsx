import React, { useState, useEffect } from 'react';
import { DocumentLink } from './types';
import { IconLink, IconPencil, IconTrash, IconSave, IconCancel, IconPlus, IconMinus } from './Icons';

interface DocumentsSectionProps {
    documents: DocumentLink[];
    onDocumentsChange: (docs: DocumentLink[]) => void;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ documents, onDocumentsChange }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [currentDoc, setCurrentDoc] = useState<{ title: string; url: string }>({ title: '', url: '' });
    const [isCollapsed, setIsCollapsed] = useState(() => {
        try {
            return window.localStorage.getItem('documentsCollapsed') === 'true';
        } catch {
            return false;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem('documentsCollapsed', isCollapsed.toString());
        } catch {
            // ignore
        }
    }, [isCollapsed]);

    const handleEdit = (doc: DocumentLink) => {
        setEditingId(doc.id);
        setCurrentDoc({ title: doc.title, url: doc.url });
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
        setCurrentDoc({ title: '', url: '' });
    };

    const handleSave = () => {
        if (!currentDoc.title || !currentDoc.url) return;

        if (isAdding) {
            const newDoc = { ...currentDoc, id: Date.now() };
            onDocumentsChange([...documents, newDoc]);
        } else if (editingId !== null) {
            const updatedDocs = documents.map(doc =>
                doc.id === editingId ? { ...doc, ...currentDoc } : doc
            );
            onDocumentsChange(updatedDocs);
        }
        handleCancel();
    };
    
    const handleDelete = (id: number) => {
        if (window.confirm('Opravdu chcete smazat tento dokument?')) {
            onDocumentsChange(documents.filter(doc => doc.id !== id));
        }
    };
    
    const handleAddNew = () => {
        setIsAdding(true);
        setEditingId(null);
        setCurrentDoc({ title: '', url: '' });
    };

    const renderEditForm = () => (
        <div className="flex flex-col sm:flex-row gap-2 my-2 p-3 bg-slate-100 dark:bg-slate-700/60 rounded-lg border border-slate-200 dark:border-slate-600">
            <input
                type="text"
                placeholder="Název dokumentu"
                value={currentDoc.title}
                onChange={(e) => setCurrentDoc({ ...currentDoc, title: e.target.value })}
                className="flex-grow p-2 rounded-md border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
                aria-label="Název dokumentu"
            />
            <input
                type="text"
                placeholder="./data/soubor.html"
                value={currentDoc.url}
                onChange={(e) => setCurrentDoc({ ...currentDoc, url: e.target.value })}
                className="flex-grow p-2 rounded-md border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
                aria-label="Cesta k souboru"
            />
            <div className="flex gap-2 justify-end flex-shrink-0">
                <button onClick={handleSave} className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors" aria-label="Uložit dokument"><IconSave /></button>
                <button onClick={handleCancel} className="p-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 transition-colors" aria-label="Zrušit"><IconCancel /></button>
            </div>
        </div>
    );
    
    return (
        <div className="bg-green-50 dark:bg-slate-800/50 border border-green-200 dark:border-slate-700 rounded-xl p-5 mb-8 shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-green-800 dark:text-green-400 m-0">Užitečné soubory</h3>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-slate-700 rounded-md transition-colors flex items-center justify-center cursor-pointer"
                    aria-label={isCollapsed ? "Rozbalit dokumenty" : "Skrýt dokumenty"}
                >
                    {isCollapsed ? <IconPlus /> : <IconMinus />}
                </button>
            </div>
            
            {!isCollapsed && (
                <>
                    <ul className="space-y-1">
                        {documents.map(doc => (
                            <li key={doc.id}>
                                {editingId === doc.id ? (
                                    renderEditForm()
                                ) : (
                                    <div className="flex justify-between items-center group p-2 rounded-md hover:bg-green-100/50 dark:hover:bg-slate-700/50 transition-colors">
                                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-green-700 dark:text-green-400 hover:underline break-all">
                                            <IconLink />
                                            <span>{doc.title}</span>
                                        </a>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4">
                                            <button onClick={() => handleEdit(doc)} className="p-2 text-slate-500 hover:text-green-500 rounded-full" aria-label="Upravit dokument"><IconPencil /></button>
                                            <button onClick={() => handleDelete(doc.id)} className="p-2 text-slate-500 hover:text-red-500 rounded-full" aria-label="Smazat dokument"><IconTrash /></button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    {isAdding && renderEditForm()}
                    <div className="mt-4 pt-4 border-t border-green-200 dark:border-slate-700">
                        {!isAdding && !editingId && (
                            <button onClick={handleAddNew} className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 hover:underline cursor-pointer">
                                <IconPlus />
                                Přidat nový dokument
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default DocumentsSection;
