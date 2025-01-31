'use client'

import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import useLocaleFromPath from "@/components/UsePath";
import { IoIosCloseCircle } from "react-icons/io";
import { EditMovieFormProps } from '@/Interfaces/Movies';

const EditMovieForm: React.FC<EditMovieFormProps> = ({ movie, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(movie);
  const locale = useLocaleFromPath();
  const {t} = useTranslation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4 text-black">{t("edit_form:edit_txt")}</h2>
          <button onClick={onClose} className='text-black text-3xl'><IoIosCloseCircle /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">{t("contact:name")}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t("wishlist:type")}</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
          <label className="block text-gray-700">{t("wishlist:language")}</label>
          <select
            name="language"
            id="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded" data-cy="edit-language-input"
            >
            <option value="">{t("wishlist:select_lang")}</option>
            <option value="Georgian">{t("wishlist:lang_geo")}</option>
            <option value="English">{t("wishlist:lang_en")}</option>
            <option value="Russian">{t("wishlist:lang_rus")}</option>
            <option value="Spanish">{t("wishlist:lang_sp")}</option>
            <option value="German">{t("wishlist:lang_ger")}</option>
          </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t("wishlist:year")}</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t("wishlist:comment")}</label>
            <input
              type="text"
              name={locale === 'ka' ? 'comment_ka' : 'comment'}
              value={locale === 'ka' ? formData.comment_ka : formData.comment || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">{t("common_placeholder:image_url")}</label>
            <input
              type="text"
              name="image_src"
              value={formData.image_src || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-darkBtn hover:bg-hoverDarkBtn text-white px-4 py-2 rounded mr-2"
            >
              {t("edit_form:cancel")}
            </button>
            <button
              type="submit"
              className="bg-redButton hover:bg-hoverRedBtn text-white px-4 py-2 rounded"
              data-cy='save-cart-btn'
            >
              {t("edit_form:save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovieForm;