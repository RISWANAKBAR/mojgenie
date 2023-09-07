import React from 'react';
import '../App.css';

export default function CharacterDetailsPopup({ character, onClose }) {
  if (!character) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white min-w-[500px] p-6 rounded-lg shadow-xl text-center">
        <h2 className="text-3xl font-semibold mb-4">{character.name}</h2>
        <table className="w-full text-left mb-4">
          <tbody>
          <tr className='my-5'>
              <td className="font-semibold w-16 pr-2">WikiUrl</td>
              <td>: {character.wikiUrl||"-"}</td>
            </tr>
            <tr className='my-5'>
              <td className="font-semibold w-16 pr-2">Race</td>
              <td>: {character.race}</td>
            </tr>
            <tr className='my-5'>
              <td className="font-semibold w-16 pr-2">Gender</td>
              <td>: {character.gender}</td>
            </tr>
            <tr className='my-5'>
              <td className="font-semibold w-16 pr-2">Birth</td>
              <td>: {character.birth}</td>
            </tr>
            <tr className='my-5'>
              <td className="font-semibold w-16 pr-2">Spouse</td>
              <td>: {character.spouse}</td>
            </tr>
        
            <tr className='my-5'>
              <td className="font-semibold w-16 pr-2">Realm</td>
              <td>: {character.realm||"-"}</td>
            </tr>
            <tr className='my-5'>
              <td className="font-semibold w-16 pr-2">Hair</td>
              <td>: {character.hair||"-"}</td>
            </tr>
            <tr className='my-5'>
              <td className="font-semibold w-16 pr-2">Height</td>
              <td>: {character.height||"-"}</td>
            </tr>
            <tr className='my-5'>
              <td className="font-semibold w-16 pr-2">Death</td>
              <td>: {character.death||"-"}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end items-center">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
        >
          Close
        </button>
        </div>
      </div>
    </div>
  );
}
