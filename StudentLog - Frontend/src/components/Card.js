export default function Card({
  title,
  value,
  icon,
  description,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-card hover:-translate-y-1 transition">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {value}
          </h2>

          {description && (
            <p className="text-sm text-gray-400 mt-2">
              {description}
            </p>
          )}
        </div>

        <div className="text-4xl">
          {icon}
        </div>

      </div>

    </div>
  );
}