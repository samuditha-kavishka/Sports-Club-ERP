'use client'
import { useState, useEffect } from 'react'
import { Box, Plus } from 'lucide-react'

export default function InventoryPage() {
  const [items, setItems] = useState<any[]>([])
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory`)
    const data = await res.json()
    setItems(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemName, quantityInStock: quantity, unitPrice: price })
    })
    setItemName('')
    setQuantity('')
    setPrice('')
    fetchItems()
  }

  return (
    <div className="p-8 relative min-h-screen">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight flex items-center">
          <Box className="w-8 h-8 mr-3 text-[#34C759]" />
          Inventory Management
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-1">
          <div className="mac-glass p-6 rounded-3xl border border-black/5 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-[#1D1D1F]">Add Equipment</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#1D1D1F] ml-1">Item Name</label>
                <input required type="text" value={itemName} onChange={e => setItemName(e.target.value)} className="mt-2 block w-full px-4 py-3 bg-white border border-black/5 rounded-xl text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all" placeholder="E.g. Tennis Rackets" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1D1D1F] ml-1">Quantity</label>
                <input required type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="mt-2 block w-full px-4 py-3 bg-white border border-black/5 rounded-xl text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1D1D1F] ml-1">Unit Price ($)</label>
                <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="mt-2 block w-full px-4 py-3 bg-white border border-black/5 rounded-xl text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all" />
              </div>
              <button type="submit" className="w-full flex justify-center py-3.5 px-4 mt-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#007AFF] hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#007AFF] transition-all duration-200 active:scale-[0.98]">
                <Plus className="w-5 h-5 mr-2" /> Add Item
              </button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="mac-glass rounded-3xl overflow-hidden border border-black/5 shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-black/5">
                <thead className="bg-black/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Item Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Unit Price</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Total Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 bg-white/50">
                  {items.map(item => (
                    <tr key={item.id} className="hover:bg-black/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-[#1D1D1F]">{item.itemName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.quantityInStock > 10 ? 'bg-[#34C759]/20 text-[#34C759]' : 'bg-[#FF3B30]/20 text-[#FF3B30]'
                          }`}>
                            {item.quantityInStock} in stock
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#86868B]">
                        ${item.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#34C759]">
                        ${(item.quantityInStock * item.unitPrice).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr><td colSpan={4} className="px-6 py-12 text-center text-sm font-medium text-[#86868B]">No inventory items found. Add some stock!</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
