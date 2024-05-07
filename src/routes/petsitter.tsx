import React, { useState, useEffect} from "react";
import { Petsitter } from "~/lib/schema";
import { petsitters } from "~/lib/repositories";
import { Button } from "~/components/ui/button";
import NewPetsitterDialog from "~/components/new-petsitter-dialog";
import { useAuth } from "~/lib/auth";


const PetSitter: React.FC = () => {
  const { user } = useAuth();

  const [petSitters, setPetSitters] = useState<Petsitter[]>([]);
  const [selectedPetSitter, setSelectedPetSitter] = useState<Petsitter | null>(null);

  const [isUserPetSitter, setIsUserPetSitter] = useState(false);

  const [isPostDialogOpen, setPostDialogOpen] = useState(false);


  // Filter states
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [maxHourlyRateFilter, setMaxHourlyRateFilter] = useState<number | null>(null);
  const [minYearsExperienceFilter, setMinYearsExperienceFilter] = useState<number | null>(null);

  // // Function to fetch pet sitters data from Firebase
  const fetchPetSitters = async () => {
    try {
      const petSittersData = await petsitters.list();
      setPetSitters(petSittersData);
    } catch (error) {
      console.error("Error fetching pet sitters:", error);
    }
  };

  useEffect(() => {
    fetchPetSitters();
  }, []);

  

  // Filter the list 
  const filteredPetSitters = petSitters.filter((petSitter) => {
    if (locationFilter && !petSitter.location.toLowerCase().includes(locationFilter)) {
      return false;
    }

    if (maxHourlyRateFilter !== null && parseFloat(petSitter.hourlyRate) > maxHourlyRateFilter) {
      return false;
    }

    if (minYearsExperienceFilter !== null && parseFloat(petSitter.yearExperience) < minYearsExperienceFilter) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    // Reset selected pet sitter if the filtered list is empty
    if (filteredPetSitters.length === 0) {
      setSelectedPetSitter(null);
    }
  }, [filteredPetSitters]);

  const checkIfUserIsPetSitter = async () => {
    try {
      const petSitter = await petsitters.get(user.uid);
      setIsUserPetSitter(!!petSitter);
    } catch (error) {
      console.error("Error checking if user is a pet sitter:", error);
    }

  };

  useEffect(() => {
    // Check if the current user is a pet sitter
  
    if (user) {
      checkIfUserIsPetSitter();
    }

  }, []);

  const handleRemoveFromPetSitters = async () => {
    //remove the current user from the list of pet sitters
    try {
      await petsitters.del(user.uid);
      setIsUserPetSitter(false);
      fetchPetSitters();
    } catch (error) {
      console.error("Error removing user from pet sitters:", error);
    }

  };

  const handleAddToPetSitters = () => {
    fetchPetSitters();
    setIsUserPetSitter(true);
  };


  const handleResetFilter = () => {
    setLocationFilter("")
    setMaxHourlyRateFilter(null)
    setMinYearsExperienceFilter(null)
    fetchPetSitters();
  };

  return (
    <div>

      <NewPetsitterDialog open={isPostDialogOpen} onOpenChange={setPostDialogOpen} onAdd={handleAddToPetSitters}/>
      <div className="flex justify-end mt-4 mb-4 mr-10">

        {!isUserPetSitter && (
          <Button onClick={() => setPostDialogOpen(true)}>
            Become a Petsitter!
          </Button>
        )}
        {isUserPetSitter && (
          <Button onClick={handleRemoveFromPetSitters}>Remove Yourself from Pet Sitters</Button>
        )}
      </div>
    

      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">

        {/* Filter options */}
        <div>
          <h2>Filter Options</h2>
          <input 
            type="text" 
            placeholder="Location" 
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          
          <div>
            <label className="mb-2 block font-semibold">
              Max Hourly Pay:
            </label>
              <input
                type="range"
                min="0"
                max="200"
                value={maxHourlyRateFilter || 0}
                onChange={(e) => setMaxHourlyRateFilter(Number(e.target.value))}
              />
              <p>${maxHourlyRateFilter}</p>
          </div>


          <div>
            <label className="mb-2 block font-semibold">
              Min Years of Experience:
            </label>
          
            <input 
              type="range" 
              min="0"
              max="100"
              value={minYearsExperienceFilter || 0}
              onChange={(e) => setMinYearsExperienceFilter(Number(e.target.value))}
            />
            <p>{minYearsExperienceFilter} years</p>

          </div>

          <Button className="mt-5" onClick={handleResetFilter}>
            Reset Filter
          </Button>
        </div>
        
        {/* List of Pet Sitters */}
        <div className="col-span-1 rounded-lg border p-4 lg:col-span-1">
          <h2 className="mb-4 text-xl font-semibold">Pet Sitters</h2>
          {filteredPetSitters.length === 0 ? (
            <p>No results found.</p>
          ) : (
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
          )}
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
                <strong>Pet Experience:</strong>{" "}
                {selectedPetSitter.petExperience}
              </p>
              <p>
                <strong>Years of Experience:</strong>{" "}
                {selectedPetSitter.yearExperience}
              </p>
              <p>
                <strong>Hourly Rate:</strong> ${selectedPetSitter.hourlyRate}/hr
              </p>
              <p>
                <strong>Description:</strong> {selectedPetSitter.bio}
              </p>

              <Button className="mt-5" onClick={() => alert(`Message sent to ${selectedPetSitter.name}`)}>
                Send a Message
             </Button>
              
            </>
          ) : (
            <p>Select a pet sitter to see details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetSitter;
