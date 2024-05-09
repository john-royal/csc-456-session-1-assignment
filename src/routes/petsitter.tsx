import React, { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import LoadingScreen from "~/components/loading";
import NewPetsitterDialog from "~/components/new-petsitter-dialog";
import { Button, LoadingButton } from "~/components/ui/button";
import {
  Petsitter,
  petsittersRepository,
  usePetsitters,
} from "~/data/petsitter";
import { useUser } from "~/lib/auth";

interface Filter {
  location: string | null;
  maxHourlyRate: number | null;
  minYearsExperience: number | null;
}

const PetSitter: React.FC = () => {
  const {
    petsitters,
    filteredPetsitters,
    isLoading,
    filters,
    setFilter,
    resetFilters,
  } = useFilteredPetsitters();
  const user = useUser();
  const removePetsitter = useMutation({
    mutationKey: ["removePetsitter", user.uid],
    mutationFn: () => petsittersRepository.del(user.uid),
    onSuccess() {
      toast.success("You've been removed as a petsitter.");
      if (selectedPetsitter?.id === user.uid) {
        setSelectedPetsitter(null);
      }
    },
    onError(error) {
      toast.error("Failed to remove you as a petsitter.", {
        description: error.message,
      });
    },
  });
  const [selectedPetsitter, setSelectedPetsitter] = useState<Petsitter | null>(
    null,
  );
  const [isNewPetsitterDialogOpen, setIsNewPetsitterDialogOpen] =
    useState(false);

  const isUserPetsitter = useMemo(() => {
    return petsitters?.some((petSitter) => petSitter.id === user.uid);
  }, [petsitters, user.uid]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <NewPetsitterDialog
        open={isNewPetsitterDialogOpen}
        onOpenChange={setIsNewPetsitterDialogOpen}
      />
      <div className="mb-4 mr-10 mt-4 flex justify-end">
        {isUserPetsitter ? (
          <LoadingButton
            onClick={() => removePetsitter.mutate()}
            loading={removePetsitter.isPending}
          >
            Remove Yourself from Pet Sitters
          </LoadingButton>
        ) : (
          <Button onClick={() => setIsNewPetsitterDialogOpen(true)}>
            Become a Petsitter!
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
        {/* Filter options */}
        <div>
          <h2>Filter Options</h2>
          <input
            type="text"
            placeholder="Location"
            value={filters.location ?? ""}
            onChange={(e) => setFilter("location", e.target.value)}
          />

          <div>
            <label className="mb-2 block font-semibold">Max Hourly Pay:</label>
            <input
              type="range"
              min="0"
              max="200"
              value={filters.maxHourlyRate ?? 0}
              onChange={(e) =>
                setFilter("maxHourlyRate", Number(e.target.value))
              }
            />
            <p>${filters.maxHourlyRate}</p>
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Min Years of Experience:
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={filters.minYearsExperience ?? 0}
              onChange={(e) =>
                setFilter("minYearsExperience", Number(e.target.value))
              }
            />
            <p>{filters.minYearsExperience} years</p>
          </div>

          <Button className="mt-5" onClick={resetFilters}>
            Reset Filter
          </Button>
        </div>

        {/* List of Pet Sitters */}
        <div className="col-span-1 rounded-lg border p-4 lg:col-span-1">
          <h2 className="mb-4 text-xl font-semibold">Pet Sitters</h2>
          {(filteredPetsitters ?? petsitters).length === 0 ? (
            <p>No results found.</p>
          ) : (
            <ul>
              {(filteredPetsitters ?? petsitters).map((ps) => (
                <li
                  key={ps.id}
                  onClick={() => setSelectedPetsitter(ps)}
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
          {selectedPetsitter ? (
            <>
              <h2 className="mb-4 text-xl font-semibold">Pet Sitter Details</h2>
              <p>
                <strong>Name:</strong> {selectedPetsitter.name}
              </p>
              <p>
                <strong>Location:</strong> {selectedPetsitter.location}
              </p>
              <p>
                <strong>Pet Experience:</strong>{" "}
                {selectedPetsitter.petExperience}
              </p>
              <p>
                <strong>Years of Experience:</strong>{" "}
                {selectedPetsitter.yearExperience}
              </p>
              <p>
                <strong>Hourly Rate:</strong> ${selectedPetsitter.hourlyRate}/hr
              </p>
              <p>
                <strong>Description:</strong> {selectedPetsitter.bio}
              </p>

              <Button
                className="mt-5"
                onClick={() =>
                  alert(`Message sent to ${selectedPetsitter.name}`)
                }
              >
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

const useFilteredPetsitters = () => {
  const petsittersQuery = usePetsitters();

  const [filters, setFilters] = useState<Filter>({
    location: null,
    maxHourlyRate: null,
    minYearsExperience: null,
  });

  const setFilter = <T extends keyof Filter>(key: T, value: Filter[T]) => {
    setFilters({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    setFilters({
      location: null,
      maxHourlyRate: null,
      minYearsExperience: null,
    });
  };

  const filteredPetsitters = useMemo(() => {
    if (Object.values(filters).every((value) => value === null)) {
      return null;
    }
    return (
      petsittersQuery.data?.filter((petSitter) => {
        if (
          filters.location &&
          !petSitter.location.toLowerCase().includes(filters.location)
        ) {
          return false;
        }

        if (
          filters.maxHourlyRate &&
          petSitter.hourlyRate > filters.maxHourlyRate
        ) {
          return false;
        }

        if (
          filters.minYearsExperience &&
          petSitter.yearExperience < filters.minYearsExperience
        ) {
          return false;
        }

        return true;
      }) ?? []
    );
  }, [filters, petsittersQuery.data]);

  return {
    isLoading: petsittersQuery.isLoading,
    petsitters: petsittersQuery.data ?? [],
    filteredPetsitters,
    filters,
    setFilter,
    resetFilters,
  };
};

export default PetSitter;
