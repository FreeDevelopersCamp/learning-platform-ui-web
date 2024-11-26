import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: async (bookingIds) => {
      await Promise.all(bookingIds.map((id) => deleteBookingApi(id))); // Assuming deleteBookingApi handles a single id
    },
    onSuccess: () => {
      toast.success("Bookings successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
