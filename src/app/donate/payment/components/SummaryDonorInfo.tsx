interface Props {
  name: string;
  email: string;
  phone: string;
  action: () => any;
  amount?: number;
}

export default function SummaryDonorInfo({ name, email, phone, action, amount }: Props) {
  return (
    <div className="rounded-md border border-gray-200 p-4 text-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-900">
            <strong className="text-gray-900">Donor:</strong> {name}
          </p>
          <p className="text-gray-900">
            <strong className="text-gray-900">Email:</strong> {email}
          </p>
          <p className="text-gray-900">
            <strong className="text-gray-900">Phone:</strong> {phone}
          </p>
        </div>
        <div>
          <button
            onClick={() => action()}
            className="text-sm font-semibold text-indigo-600 hover:underline"
            type="button"
          >
            Change
          </button>
        </div>
      </div>
      {amount && (
        <p className="inline-flex w-full justify-between text-lg font-medium text-indigo-600">
          <strong className="text-bold text-indigo-600">Total:</strong> ${amount.toFixed(2)}
        </p>
      )}
    </div>
  );
}
