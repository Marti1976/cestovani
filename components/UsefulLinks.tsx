import React, { useState } from 'react';
import { UsefulLink } from './types';
import { IconLink, IconPencil, IconTrash, IconSave, IconCancel, IconPlus } from './Icons';

interface UsefulLinksProps {
    links: UsefulLink[];
    onLinksChange: (links: UsefulLink[]) => void;
}

const UsefulLinks: React.FC<UsefulLinksProps> = ({ links, onLinksChange }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [currentLink, setCurrentLink] = useState<{ title: string; url: string }>({ title: '', url: '' });

    const handleEdit = (link: UsefulLink) => {
        setEditingId(link.id);
        setCurrentLink({ title: link.title, url: link.url });
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
        setCurrentLink({ title: '', url: '' });
    };

    const handleSave = () => {
        if (!currentLink.title || !currentLink.url) return;

        if (isAdding) {
            const newLink = { ...currentLink, id: Date.now() };
            onLinksChange([...links, newLink]);
        } else if (editingId !== null) {
            const updatedLinks = links.map(link =>
                link.id === editingId ? { ...link, ...currentLink } : link
            );
            onLinksChange(updatedLinks);
        }
        handleCancel(); // Reset state
    };
    
    const handleDelete = (id: number) => {
        if (window.confirm('Opravdu chcete smazat tento odkaz?')) {
            onLinksChange(links.filter(link => link.id !== id));
        }
    };
    
    const handleAddNew = () => {
        setIsAdding(true);
        setEditingId(null);
        setCurrentLink({ title: '', url: '' });
    };


    const renderEditForm = () => (
        <div className="flex flex-col sm:flex-row gap-2 my-2 p-3 bg-slate-100 dark:bg-slate-700/60 rounded-lg border border-slate-200 dark:border-slate-600">
            <input
                type="text"
                placeholder="Titulek odkazu"
                value={currentLink.title}
                onChange={(e) => setCurrentLink({ ...currentLink, title: e.target.value })}
                className="flex-grow p-2 rounded-md border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                aria-label="Titulek odkazu"
            />
            <input
                type="url"
                placeholder="https://example.com"
                value={currentLink.url}
                onChange={(e) => setCurrentLink({ ...currentLink, url: e.target.value })}
                className="flex-grow p-2 rounded-md border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                aria-label="URL adresa"
            />
            <div className="flex gap-2 justify-end flex-shrink-0">
                <button onClick={handleSave} className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors" aria-label="Uložit odkaz"><IconSave /></button>
                <button onClick={handleCancel} className="p-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 transition-colors" aria-label="Zrušit"><IconCancel /></button>
            </div>
        </div>
    );
    
    return (
        <div className="bg-blue-50 dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700 rounded-xl p-5 mb-8 shadow-md">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-4">Užitečné odkazy</h3>
            <ul className="space-y-1">
                {links.map(link => (
                    <li key={link.id}>
                        {editingId === link.id ? (
                            renderEditForm()
                        ) : (
                            <div className="flex justify-between items-center group p-2 rounded-md hover:bg-blue-100/50 dark:hover:bg-slate-700/50 transition-colors">
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:underline break-all">
                                    <IconLink />
                                    <span>{link.title}</span>
                                </a>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4">
                                    <button onClick={() => handleEdit(link)} className="p-2 text-slate-500 hover:text-blue-500 rounded-full" aria-label="Upravit odkaz"><IconPencil /></button>
                                    <button onClick={() => handleDelete(link.id)} className="p-2 text-slate-500 hover:text-red-500 rounded-full" aria-label="Smazat odkaz"><IconTrash /></button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
             {isAdding && renderEditForm()}
            <div className="mt-4 pt-4 border-t border-blue-200 dark:border-slate-700">
                {!isAdding && !editingId && (
                     <button onClick={handleAddNew} className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        <IconPlus />
                        Přidat nový odkaz
                    </button>
                )}
            </div>
        </div>
    );
};

export default UsefulLinks;