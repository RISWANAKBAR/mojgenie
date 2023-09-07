import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import CharacterDetailsPopup from "./CharacterDetailsPopup"; 
import Dialog from "@mui/material/Dialog";

export default function Table() {
  const [characterData, setCharacterData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [charactersPerPage, setCharactersPerPage] = useState(10);
  const [selectedCharacter, setSelectedCharacter] = useState(null); 
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("match"); 
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [isButton, setisButton] = useState(false);

  const fetchCharacterData = () => {
    let apiUrl = `https://the-one-api.dev/v2/character?sort=name:${sortOrder}`;

    if (searchTerm) {
      const filter = filterOption === "match" ? "" : "!";
      apiUrl += `&name${filter}=${searchTerm}`;
    }


    if (selectedRace) {
      apiUrl += `&race=${selectedRace}`;
    }


    if (selectedGender) {
      apiUrl += `&gender=${selectedGender}`;
    }

    const accessToken = "gymQ_RvzlDbhqLZopPcv";

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setCharacterData(response.data.docs);
      })
      .catch((error) => {
        console.error("Error fetching character data:", error);
      });
  };

  const pageCount = Math.ceil(characterData.length / charactersPerPage);
  const displayCharacters = characterData
    .slice(pageNumber * charactersPerPage, (pageNumber + 1) * charactersPerPage)
    .map((character, index) => (
      <tr
        key={character._id}
        className={`cursor-pointer ${
          index % 2 === 0 ? 'bg-even-row' : 'bg-odd-row'
        }`}
        onClick={() => openCharacterDetails(character)}
      >
        <td className="border text-[16px] font-sans font-normal  px-4 py-2 text-left">{character.name}</td>
        <td className="border text-[15px] font-sans font-normal px-4 py-2 text-left">{character.race}</td>
        <td className="border text-[15px] font-sans font-normal px-4 py-2 text-left">{character.gender}</td>
        <td className="border text-[15px]  px-4 py-2 text-left font-sans font-normal">{character.birth}</td>
        <td className="border text-[15px]  font-sans font-normal px-4 py-2 text-left">{character.spouse}</td>
      </tr>
    ));

  const handlePageChange = (selectedPage) => {
    setPageNumber(selectedPage.selected);
  };

  const handlePerPageChange = (e) => {
    const newCharactersPerPage = parseInt(e.target.value);
    setCharactersPerPage(newCharactersPerPage);
    setPageNumber(0);
  };

  const openCharacterDetails = (character) => {
    setSelectedCharacter(character);
  };

  const closeCharacterDetails = () => {
    setSelectedCharacter(null);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRaceChange = (e) => {
    setSelectedRace(e.target.value);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleSearchSubmit = () => {
    fetchCharacterData();
    setisButton(true);
  };

  useEffect(() => {
    fetchCharacterData();
  }, [sortOrder, isButton]);

  console.log("tttt=>", characterData);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border border-blue-900 rounded-lg bg-whitesmoke shadow-lg w-[80%] p-4 min-h-[700px]">
        <div className="container mx-auto p-4">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-blue-900 mb-2">Character's</h1>
          </div>
          <div className="flex flex-row items-center w-l/6 mb-2">
              <label className="block text-gray-600 ml-2">Sort By:</label>
              <select
                className="border p-2 ml-2 rounded-md"
                value={sortOrder}
                onChange={handleSortOrderChange}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          <div className="flex flex-wrap gap-3  items-center mb-4 justify-between">
           
            <div className="flex flex-row items-center">
              Search By :
              <input
                type="text"
                placeholder=" Name"
                className="border p-2 ml-2 rounded-md"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
            </div>

            <div className="flex flex-row items-center">
              <label className="block text-gray-600 mr-2">Select Race:</label>
              <select
                className="border p-2 ml-2 rounded-md"
                value={selectedRace}
                onChange={handleRaceChange}
              >
                <option value="">All</option>
                <option value="Men">Men</option>
                <option value="Human">Human</option>
                <option value="Elf">Elf</option>
                <option value="Dwarf">Dwarf</option>
                <option value="Hobbit">Hobbit</option>
                <option value="Maiar">Maiar</option>
                <option value="Dragons">Dragons</option>
                <option value="Orcs">Orcs</option>
                <option value="Ents">Ents</option>
                <option value="Ainur">Ainur</option>
              </select>
            </div>
            
            <div className="flex flex-row items-center">
              <label className="block text-gray-600 mr-2">Select Gender:</label>
              <select
                className="border p-2 ml-2 rounded-md"
                value={selectedGender}
                onChange={handleGenderChange}
              >
                <option value="">Any</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            
            <button
              className="bg-blue-500 text-white p-2 ml-2 rounded-md px-20"
              onClick={handleSearchSubmit}
            >
              Submit
            </button>
          </div>

          <div className="overflow-auto h-[430px]">
            <table className="table-fixed w-full border-collapse border border-blue-500 rounded-lg">
              <thead>
                <tr>
                  <th className="w-1/5 px-4 py-2 border text-white bg-blue-900">
                    Name
                  </th>
                  <th className="w-1/5 px-4 py-2 border text-white bg-blue-900">
                    Race
                  </th>
                  <th className="w-1/5 px-4 py-2 border text-white bg-blue-900">
                    Gender
                  </th>
                  <th className="w-1/5 px-4 py-2 border text-white bg-blue-900">
                    Birth
                  </th>
                  <th className="w-1/5 px-4 py-2 border text-white bg-blue-900">
                    Spouse
                  </th>
                </tr>
              </thead>
              <tbody>{displayCharacters}</tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="ml-8">
              <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName="flex"
                activeClassName="border border-blue-500 rounded-md square-sm"
                pageClassName="mx-2 px-2"
                previousLabel=""
                nextLabel=""
              />
            </div>
            <div className="flex items-center mr-16">
              <label className="block text-gray-600 mr-2">Limit</label>
              <select
                className="border rounded-md border-blue-500 px-4 h-[30px] text-sm"
                value={charactersPerPage}
                onChange={handlePerPageChange}
              >
                <option className="text-sm" value="10">
                  10
                </option>
                <option className="text-sm" value="20">
                  20
                </option>
                <option className="text-sm" value="50">
                  50
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={selectedCharacter} onClose={closeCharacterDetails} fullWidth maxWidth="md">
        <CharacterDetailsPopup
          character={selectedCharacter}
          onClose={closeCharacterDetails}
        />
      </Dialog>
    </div>
  );
}
