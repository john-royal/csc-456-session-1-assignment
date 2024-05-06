import React, { useState } from "react";

interface PetSitter {
  id: number;
  name: string;
  location: string;
  petExperience: string;
  yearsOfExperience: number;
  hourlyRate: number;
  description: string;
}

const dummyPetSitters: PetSitter[] = [
  {
    id: 1,
    name: "Alice Johnson",
    location: "New York",
    petExperience: "Dogs, Cats",
    yearsOfExperience: 5,
    hourlyRate: 20,
    description:
      "Loves pets and taking care of them. Great with dogs and cats.",
  },
  {
    id: 2,
    name: "Bob Smith",
    location: "Los Angeles",
    petExperience: "Birds, Reptiles",
    yearsOfExperience: 3,
    hourlyRate: 15,
    description:
      "Specializes in exotic pets like birds and reptiles. Friendly and experienced.",
  },
  {
    id: 3,
    name: "Charlie Williams",
    location: "Chicago",
    petExperience: "Dogs, Cats, Birds",
    yearsOfExperience: 8,
    hourlyRate: 25,
    description:
      "Very experienced with many types of pets. Loves spending time with them.",
  },
  {
    id: 4,
    name: "Diana King",
    location: "San Francisco",
    petExperience: "Dogs, Cats, Birds, Fish",
    yearsOfExperience: 7,
    hourlyRate: 22,
    description:
      "Reliable pet sitter with experience in multiple types of pets.",
  },
  {
    id: 5,
    name: "Evan Green",
    location: "Miami",
    petExperience: "Dogs, Cats, Fish",
    yearsOfExperience: 4,
    hourlyRate: 18,
    description:
      "Passionate about pets and enjoys taking care of them. Great with cats and fish.",
  },
  {
    id: 6,
    name: "Fiona White",
    location: "New York",
    petExperience: "Dogs, Cats, Birds, Reptiles",
    yearsOfExperience: 10,
    hourlyRate: 28,
    description:
      "Extremely experienced pet sitter with a focus on high-quality care.",
  },
  {
    id: 7,
    name: "George Lee",
    location: "Los Angeles",
    petExperience: "Dogs, Birds",
    yearsOfExperience: 6,
    hourlyRate: 19,
    description:
      "Friendly and reliable pet sitter with great reviews. Loves dogs and birds.",
  },
  {
    id: 8,
    name: "Hannah Patel",
    location: "Chicago",
    petExperience: "Cats, Birds, Reptiles",
    yearsOfExperience: 9,
    hourlyRate: 26,
    description: "Great with small and exotic animals. Caring and attentive.",
  },
  {
    id: 9,
    name: "Isabella Scott",
    location: "San Francisco",
    petExperience: "Dogs, Cats, Birds",
    yearsOfExperience: 7,
    hourlyRate: 23,
    description:
      "Expert pet sitter with many satisfied clients. Loves caring for pets.",
  },
  {
    id: 10,
    name: "Jack Wilson",
    location: "Miami",
    petExperience: "Dogs, Cats",
    yearsOfExperience: 3,
    hourlyRate: 15,
    description: "Young but skilled pet sitter with a love for dogs and cats.",
  },
  {
    id: 11,
    name: "Kara Baker",
    location: "New York",
    petExperience: "Cats, Birds, Fish",
    yearsOfExperience: 5,
    hourlyRate: 20,
    description:
      "Loves animals of all kinds and has great experience caring for them.",
  },
  {
    id: 12,
    name: "Liam Rodriguez",
    location: "Los Angeles",
    petExperience: "Dogs, Cats, Birds, Fish",
    yearsOfExperience: 4,
    hourlyRate: 18,
    description:
      "Friendly pet sitter with experience in a variety of animals. Highly recommended.",
  },
  {
    id: 13,
    name: "Maya Kim",
    location: "Chicago",
    petExperience: "Dogs, Cats, Birds, Reptiles",
    yearsOfExperience: 7,
    hourlyRate: 23,
    description:
      "Knowledgeable pet sitter with a passion for animals. Great with all pets.",
  },
  {
    id: 14,
    name: "Nathan Clark",
    location: "San Francisco",
    petExperience: "Dogs, Cats, Birds",
    yearsOfExperience: 10,
    hourlyRate: 27,
    description:
      "Veteran pet sitter with lots of experience. Reliable and trustworthy.",
  },
  {
    id: 15,
    name: "Olivia Morris",
    location: "Miami",
    petExperience: "Cats, Birds, Reptiles",
    yearsOfExperience: 5,
    hourlyRate: 20,
    description:
      "Loves caring for pets and providing them with great attention and care.",
  },
  {
    id: 16,
    name: "Peter Turner",
    location: "New York",
    petExperience: "Dogs, Cats, Fish",
    yearsOfExperience: 6,
    hourlyRate: 22,
    description:
      "Passionate about animal welfare and enjoys spending time with pets.",
  },
  {
    id: 17,
    name: "Quinn Walker",
    location: "Los Angeles",
    petExperience: "Cats, Birds",
    yearsOfExperience: 4,
    hourlyRate: 18,
    description: "Enjoys caring for cats and birds. Friendly and attentive.",
  },
  {
    id: 18,
    name: "Rachel Bennett",
    location: "Chicago",
    petExperience: "Dogs, Cats, Fish",
    yearsOfExperience: 8,
    hourlyRate: 24,
    description: "Experienced with different pets and loves caring for them.",
  },
  {
    id: 19,
    name: "Samuel Johnson",
    location: "San Francisco",
    petExperience: "Dogs, Cats",
    yearsOfExperience: 6,
    hourlyRate: 20,
    description:
      "Loves caring for dogs and cats and is very reliable and friendly.",
  },
  {
    id: 20,
    name: "Tara Cooper",
    location: "Miami",
    petExperience: "Birds, Reptiles",
    yearsOfExperience: 4,
    hourlyRate: 17,
    description:
      "Specializes in exotic pets and is very knowledgeable about their care.",
  },
];

const availableLocations = ["New York", "Los Angeles", "Chicago"];

const Petsitter: React.FC = () => {
  const [petSitters] = useState<PetSitter[]>(dummyPetSitters);
  const [locationFilter, setLocationFilter] = useState("");
  const [minExperienceFilter, setMinExperienceFilter] = useState<number>(0);
  const [maxExperienceFilter, setMaxExperienceFilter] = useState<number>(10);
  const [selectedPetSitter, setSelectedPetSitter] = useState<PetSitter | null>(
    null,
  );

  const applyFilters = (): PetSitter[] => {
    return petSitters.filter((ps) => {
      const locationMatch =
        locationFilter === "" || ps.location === locationFilter;
      const experienceMatch =
        ps.yearsOfExperience >= minExperienceFilter &&
        ps.yearsOfExperience <= maxExperienceFilter;
      return locationMatch && experienceMatch;
    });
  };

  const filteredPetSitters = applyFilters();

  return (
    <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
      {/* Filters column */}
      <div className="col-span-1 rounded-lg border p-4">
        <h2 className="mb-4 text-xl font-semibold">Filters</h2>

        {/* Location Filter */}
        <div className="mb-4">
          <label className="mb-2 block font-semibold">Location:</label>
          {availableLocations.map((location) => (
            <div key={location} className="mb-2">
              <input
                type="radio"
                id={location}
                name="location"
                value={location}
                checked={locationFilter === location}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="mr-2"
              />
              <label htmlFor={location}>{location}</label>
            </div>
          ))}
        </div>

        {/* Min Experience Filter */}
        <div className="mb-4">
          <label className="mb-2 block font-semibold">
            Min Years of Experience:
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={minExperienceFilter}
            onChange={(e) => setMinExperienceFilter(Number(e.target.value))}
            className="w-full"
          />
          <p>{minExperienceFilter} years</p>
        </div>

        {/* Max Experience Filter */}
        <div className="mb-4">
          <label className="mb-2 block font-semibold">
            Max Years of Experience:
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={maxExperienceFilter}
            onChange={(e) => setMaxExperienceFilter(Number(e.target.value))}
            className="w-full"
          />
          <p>{maxExperienceFilter} years</p>
        </div>
      </div>

      {/* List of Pet Sitters */}
      <div className="col-span-1 rounded-lg border p-4 lg:col-span-1">
        <h2 className="mb-4 text-xl font-semibold">Pet Sitters</h2>
        <ul>
          {filteredPetSitters.map((ps) => (
            <li
              key={ps.id}
              onClick={() => setSelectedPetSitter(ps)}
              className="cursor-pointer border-b px-4 py-2 hover:bg-gray-100"
            >
              <strong>{ps.name}</strong> - {ps.location}
            </li>
          ))}
        </ul>
      </div>

      {/* Pet Sitter Details */}
      <div className="col-span-1 rounded-lg border p-4 lg:col-span-1">
        {selectedPetSitter ? (
          <>
            <h2 className="mb-4 text-xl font-semibold">Pet Sitter Details</h2>
            <p>
              <strong>Name:</strong> {selectedPetSitter.name}
            </p>
            <p>
              <strong>Location:</strong> {selectedPetSitter.location}
            </p>
            <p>
              <strong>Pet Experience:</strong> {selectedPetSitter.petExperience}
            </p>
            <p>
              <strong>Years of Experience:</strong>{" "}
              {selectedPetSitter.yearsOfExperience}
            </p>
            <p>
              <strong>Hourly Rate:</strong> {selectedPetSitter.hourlyRate}$/hr
            </p>
            <p>
              <strong>Description:</strong> {selectedPetSitter.description}
            </p>
            <button
              onClick={() => alert(`Message sent to ${selectedPetSitter.name}`)}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Message Pet Sitter
            </button>
          </>
        ) : (
          <p>Select a pet sitter to see details.</p>
        )}
      </div>
    </div>
  );
};

export default Petsitter;
