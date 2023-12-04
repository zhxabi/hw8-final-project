
export default function ErrMessage({ msg }: { msg: String }) {

  return(
    <div className="flex-auto mx-auto rounded px-4 py-4 bg-red-100 text-red-600">
      {msg}
    </div>
  )
}