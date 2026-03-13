import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { categories, Product } from '@/data/products';
import { LogOut, Plus, Edit2, Trash2, Upload, ImageIcon } from 'lucide-react';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Sarees' as const,
    image: '',
  });

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Convert image file to base64
  const handleImageUpload = (file: File, isEdit = false) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setFormData(prev => ({ ...prev, image: base64 }));
      if (!isEdit) setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.image) {
      alert('Please fill in all fields and upload an image');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseInt(formData.price),
      category: formData.category,
      image: formData.image,
    };

    addProduct(newProduct);
    setFormData({ name: '', price: '', category: 'Sarees', image: '' });
    setImagePreview('');
    setIsAddOpen(false);
  };

  const handleEditProduct = () => {
    if (!editingProduct || !formData.name || !formData.price || !formData.image) {
      alert('Please fill in all fields');
      return;
    }

    const updated: Product = {
      ...editingProduct,
      name: formData.name,
      price: parseInt(formData.price),
      category: formData.category,
      image: formData.image,
    };

    updateProduct(editingProduct.id, updated);
    setFormData({ name: '', price: '', category: 'Sarees', image: '' });
    setImagePreview('');
    setEditingProduct(null);
    setIsEditOpen(false);
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
    });
    setImagePreview(product.image);
    setIsEditOpen(true);
  };

  const startDelete = (id: string) => setDeleteId(id);

  const confirmDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      setDeleteId(null);
    }
  };

  const resetAllProducts = () => {
    resetProducts();
    setShowResetDialog(false);
  };

  // Reusable image upload field
  const ImageUploadField = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div>
      <label className="text-sm font-medium">Product Image</label>
      <div
        className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-colors"
        onClick={() => isEdit ? editFileInputRef.current?.click() : fileInputRef.current?.click()}
      >
        {formData.image ? (
          <div className="space-y-2">
            <img
              src={formData.image}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg mx-auto"
            />
            <p className="text-xs text-gray-500">Click to change image</p>
          </div>
        ) : (
          <div className="space-y-2 py-2">
            <ImageIcon className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="text-sm text-gray-500">Click to upload image</p>
            <p className="text-xs text-gray-400">PNG, JPG, WEBP supported</p>
          </div>
        )}
        <input
          ref={isEdit ? editFileInputRef : fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file, isEdit);
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">Neeraja Collections Management</p>
          </div>
          <Button onClick={handleLogout} variant="ghost" className="text-white hover:bg-gray-800">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>
          {categories.map((cat) => (
            <Card key={cat}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{cat}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.filter((p) => p.category === cat).length}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Controls */}
        <div className="mb-6 flex gap-2">
          <Dialog open={isAddOpen} onOpenChange={(open) => {
            setIsAddOpen(open);
            if (!open) { setFormData({ name: '', price: '', category: 'Sarees', image: '' }); setImagePreview(''); }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Add a new product to your collection</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Product Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Silk Saree"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Price (₹)</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., 5000"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as any })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <ImageUploadField isEdit={false} />
                <Button onClick={handleAddProduct} className="w-full bg-pink-600 hover:bg-pink-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={() => setShowResetDialog(true)}>
            Reset to Default
          </Button>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your product inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>₹{product.price.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover border"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => startEdit(product)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startDelete(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={(open) => {
        setIsEditOpen(open);
        if (!open) { setFormData({ name: '', price: '', category: 'Sarees', image: '' }); setImagePreview(''); }
      }}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Product Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Silk Saree"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Price (₹)</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g., 5000"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as any })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ImageUploadField isEdit={true} />
            <Button onClick={handleEditProduct} className="w-full bg-pink-600 hover:bg-pink-700">
              Update Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The product will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset to Default Products?</AlertDialogTitle>
            <AlertDialogDescription>
              This will replace all products with the default collection. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={resetAllProducts} className="bg-orange-600 hover:bg-orange-700">
              Reset
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
